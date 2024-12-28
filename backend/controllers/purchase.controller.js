import UserPlan from '../models/userplan.model.js';
import Plan from '../models/plan.model.js';
import Earnings from '../models/earning.model.js';
import ReferralEarnings from '../models/referralEarnings.model.js';
import User from '../models/user.model.js';


export const purchasePlan = async (req, res) => {
  try {
    const { planId, paymentGateway, paymentScreenshot, taxId } = req.body;
    const { userId } = req.params;

    // Fetch plan details
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Calculate start and end dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration);

    // Create new user plan
    const userPlan = new UserPlan({
      userId,
      planId,
      state: 'pending',
      startDate,
      endDate,
      dailyProfit: plan.dailyProfit,
      totalProfit: plan.totalProfit,
      paymentGateway,
      paymentScreenshot,
      taxId,
    });
    await userPlan.save();

    return res.status(201).json({ message: 'Plan purchased successfully', userPlan });
  } catch (error) {
    console.error('Error in purchasePlan:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateEarnings = async () => {
  try {
    const activePlans = await UserPlan.find({ state: 'active' });

    for (const plan of activePlans) {
      const now = new Date();

      // Mark plans as completed if their end date has passed
      if (now > plan.endDate) {
        plan.state = 'completed';
        await plan.save();
        continue;
      }

      // Update user's earnings with daily profit
      await Earnings.findOneAndUpdate(
        { userId: plan.userId },
        { $inc: { totalEarnings: plan.dailyProfit } },
        { upsert: true, new: true }
      );

      // Handle referral earnings
      const referralEarning = await ReferralEarnings.findOne({ referredUserId: plan.userId });
      if (referralEarning) {
        await Earnings.findOneAndUpdate(
          { userId: referralEarning.userId },
          { $inc: { totalEarnings: referralEarning.dailyProfitShare } },
          { upsert: true, new: true }
        );
      }
    }
  } catch (error) {
    console.error('Error in updateEarnings:', error);
  }
};


  export const updatePlanState = async (req, res) => {
    try {
      const { planId } = req.body;  // Extract the planId from the request body

      // Find the user plan based on planId and state "pending"
      const userPlan = await UserPlan.findOne({ planId, state: 'pending' }).populate('planId');
      if (!userPlan) {
        return res.status(404).json({ message: 'No pending plan found for the given planId' });
      }

      // Update the state of the found user plan to "active"
      userPlan.state = 'active';
      await userPlan.save();

      // Update the user's earnings based on daily profit
      const earnings = await Earnings.findOneAndUpdate(
        { userId: userPlan.userId },
        { $inc: { totalEarnings: userPlan.dailyProfit } },
        { upsert: true, new: true }
      );

      // Add daily earnings record
      earnings.dailyEarnings.push({
        date: new Date(),
        amount: userPlan.dailyProfit,
      });
      await earnings.save();

      // Handle referral earnings (only for users who were referred)
      const user = await User.findById(userPlan.userId).populate('referredBy');
      if (user?.referredBy) {
        const referrerId = user.referredBy._id;

        // Calculate one-time referral bonus (10% of plan price)
        const oneTimeReferralBonus = userPlan.planId.price * 0.1;

        // Add referral earnings to the referrer's account
        const referrerEarnings = await Earnings.findOneAndUpdate(
          { userId: referrerId },
          { $inc: { totalEarnings: oneTimeReferralBonus } },
          { upsert: true, new: true }
        );

        // Record referral earnings in daily earnings
        referrerEarnings.dailyEarnings.push({
          date: new Date(),
          amount: oneTimeReferralBonus,
        });
        await referrerEarnings.save();

        // Store referral details for daily profit share
        const referralEarning = new ReferralEarnings({
          userId: referrerId,
          referredUserId: userPlan.userId,
          dailyProfitShare: userPlan.planId.dailyProfit * 0.1,
        });
        await referralEarning.save();
      }

      return res.status(200).json({ message: 'Plan updated to active and earnings updated' });
    } catch (error) {
      console.error('Error in updatePlanState:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  export const getAllPurchasedPlans = async (req, res) => {
    try {
      // Fetch all active user plans with user details, plan information, and the payment screenshot
      const userPlans = await UserPlan.find({})
        .populate('userId', 'username email referredBy')  // Get user details and the referrer
        .populate('planId', 'name price dailyProfit duration totalProfit startDate endDate')  // Explicitly get plan details
        .exec();
  
      if (!userPlans.length) {
        return res.status(404).json({ message: 'No active purchased plans found.' });
      }
  
      // Iterate over user plans and prepare the response
      const response = await Promise.all(userPlans.map(async (userPlan) => {
        const user = userPlan.userId;
        const plan = userPlan.planId;
  
        // Fetch the user's earnings for this plan
        const userEarnings = await Earnings.findOne({ userId: user._id }) || { totalEarnings: 0, dailyEarnings: [] };
  
        // Fetch the referrer details (populate referredBy with username)
        const referrer = user.referredBy ? user.referredBy.username : 'N/A';
        const referrerName = user.referredBy ? user.referredBy.name : 'N/A';  // Assuming the referredBy has a 'name' field
  
        // Prepare the response for each user plan, including payment screenshot
        return {
          planRequestDetail: {
            planDetail: {
              planId: plan._id, // Include the planId
              planName: plan.name, // Plan name
              price: plan.price,
              duration: plan.duration,
              dailyProfit: plan.dailyProfit,
              totalProfit: plan.totalProfit,
              startDate: plan.startDate, // Plan start date
              endDate: plan.endDate // Plan end date
            },
            userDetail: {
              username: user.username,
              referredBy: referrer,  // Referrer's username
              referrerName: referrerName,  // Referrer's full name
              paymentGateway: userPlan.paymentGateway, // Payment method
              planState: userPlan.state, // Plan status (approved, pending, etc.)
              paymentScreenshot: userPlan.paymentScreenshot, // Payment screenshot URL
            },
            approved: userPlan.state, // Approval status based on the plan state
            startDate: userPlan.startDate, // User plan start date
            endDate: userPlan.endDate, // User plan end date
          },
          earnings: {
            totalEarnings: userEarnings.totalEarnings,
            dailyEarnings: userEarnings.dailyEarnings,
          }
        };
      }));
  
      // Send the response with all purchased plans data, including payment screenshots and planId
      res.status(200).json({
        message: 'Fetched all purchased plans successfully.',
        plans: response,
      });
    } catch (error) {
      console.error('Error in getAllPurchasedPlans:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


export const getReferralDetails = async (req, res) => {
  try {
    const userId = req.user.id; // User1 (the one who's logged in)

    // Fetch User1's details and referrals (the referred users)
    const user = await User.findById(userId).populate('referrals', 'username email referralCode');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the referral data
    const referredUsers = user.referrals;

    const referralDetails = [];
    let totalReferralProfit = 0; // Initialize total referral profit

    // Iterate through each referred user (User2)
    for (const referredUser of referredUsers) {
      // Fetch the plan purchased by User2
      const user2Plan = await UserPlan.findOne({ userId: referredUser._id, state: 'active' }).populate('planId');
      if (user2Plan) {
        const plan = user2Plan.planId; // The plan details of User2

        // Calculate 10% profit User1 will get
        const referralProfit = plan.price * 0.1; // 10% of the plan price

        // Accumulate the total referral profit
        totalReferralProfit += referralProfit;

        // Store the relevant data for User1's referral details
        referralDetails.push({
          username: referredUser.username,
          planName: plan.name,
          planPrice: plan.price,
          planExpiryDate: user2Plan.endDate,
          user1Profit: referralProfit, // 10% of User2's plan price
        });
      }
    }

    // Send the response
    const response = {
      user: {
        username: user.username,
        email: user.email,
        referralCode: user.referralCode,
      },
      referralDetails, // All details about User2's plans and User1's earnings
      totalReferralProfit, // Total profit User1 has earned from referrals
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching referral details for User1:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getUserProfitAndPlans = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user's purchased plans
    const userPlans = await UserPlan.find({ userId }).populate('planId', 'name duration dailyProfit totalProfit');

    // Fetch user's earnings
    const userEarnings = await Earnings.findOne({ userId }) || { totalEarnings: 0, dailyEarnings: [] };

    // Build response
    const response = {
      plans: userPlans.map(plan => ({
        planId: plan.planId._id,
        name: plan.planId.name,
        duration: plan.planId.duration,
        dailyProfit: plan.planId.dailyProfit,
        totalProfit: plan.planId.totalProfit,
        state: plan.state,
        startDate: plan.startDate,
        endDate: plan.endDate,
      })),
      earnings: {
        totalEarnings: userEarnings.totalEarnings,
        dailyEarnings: userEarnings.dailyEarnings,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching user profits and plans:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch user details
    const user = await User.findById(userId).populate("referrals", "username email referralCode");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Total referrals and their count
    const totalReferrals = user.referrals ? user.referrals.length : 0;

    // Fetch purchased plans
    const userPlans = await UserPlan.find({ userId }).populate("planId", "name price dailyProfit duration totalProfit") || [];

    // Fetch user earnings
    const userEarnings = await Earnings.findOne({ userId });
    const totalBalance = userEarnings?.totalEarnings || 0;

    // Fetch referral earnings and calculate total
    const referralEarnings = await ReferralEarnings.find({ userId }) || [];
    const totalReferralProfit = referralEarnings.reduce((sum, earning) => sum + (earning.totalEarned || 0), 0);

    // Build response
    const response = {
      user: {
        username: user.username,
        email: user.email,
        referralCode: user.referralCode,
      },
      totalReferrals,
      referrals: user.referrals.map(referral => ({
        username: referral?.username || "N/A",
        email: referral?.email || "N/A",
        referralCode: referral?.referralCode || "N/A",
      })),
      totalBalance,
      totalReferralProfit,
      purchasedPlans: userPlans.map(plan => ({
        planId: plan.planId?._id || null,
        name: plan.planId?.name || "Unknown",
        price: plan.planId?.price || 0,
        dailyProfit: plan.planId?.dailyProfit || 0,
        duration: plan.planId?.duration || 0,
        totalProfit: plan.planId?.totalProfit || 0,
        state: plan.state,
        startDate: plan.startDate,
        endDate: plan.endDate,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch users with specific fields
    const users = await User.find({}, "username email role balance");

    // Map the users to ensure the response includes _id explicitly
    const userResponse = users.map(user => ({
      _id: user._id, // Include _id
      username: user.username,
      email: user.email,
      role: user.role,
      balance: user.balance,
    }));

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch user details
    const user = await User.findById(userId).populate("referrals", "username email referralCode");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Total referrals and their count
    const totalReferrals = user.referrals ? user.referrals.length : 0;

    // Fetch purchased plans for the user
    const userPlans = await UserPlan.find({ userId }).populate("planId", "name price dailyProfit duration totalProfit");

    // Fetch user earnings
    const userEarnings = await Earnings.findOne({ userId });
    const totalBalance = userEarnings?.totalEarnings || 0;

    // Calculate total referral earnings (10% of referred user's purchased plan price)
    let totalReferralProfit = 0;
    const referralProfits = [];

    // Loop through the user's referrals to calculate referral earnings
    for (const referral of user.referrals) {
      // Check if referral is valid
      if (!referral || !referral._id) continue; // Skip invalid referrals

      const referralPlans = await UserPlan.find({ userId: referral._id }).populate("planId", "name price");

      // Calculate referral profit
      let referralProfit = 0;
      const plansDetails = referralPlans.map(plan => {
        const planProfit = plan.planId?.price * 0.1 || 0;
        referralProfit += planProfit;

        return {
          planName: plan.planId?.name,
          planPrice: plan.planId?.price,
          referralProfit: planProfit,
        };
      });

      // Add the referral profit to the total
      totalReferralProfit += referralProfit;

      // Store details for the response
      referralProfits.push({
        referral: {
          username: referral.username,
          email: referral.email,
          referralCode: referral.referralCode,
        },
        plans: plansDetails,
        totalReferralProfit: referralProfit,
      });
    }

    // Calculate the number of active plans
    const activePlansCount = userPlans.filter(plan => plan.state === "active").length;

    // Build response object
    const response = {
      user: {
        username: user.username,
        email: user.email,
        referralCode: user.referralCode,
      },
      totalReferrals,
      referrals: user.referrals.map(referral => ({
        username: referral.username,
        email: referral.email,
        referralCode: referral.referralCode,
      })),
      totalBalance,
      totalReferralProfit,
      activePlansCount,
      purchasedPlans: userPlans.map(plan => ({
        planId: plan.planId?._id,
        name: plan.planId?.name,
        price: plan.planId?.price,
        dailyProfit: plan.planId?.dailyProfit,
        duration: plan.planId?.duration,
        totalProfit: plan.planId?.totalProfit,
        state: plan.state,
        paymentGateway: plan.paymentGateway,
        paymentScreenshot: plan.paymentScreenshot,
        taxId: plan.taxId,
        startDate: plan.startDate,
        endDate: plan.endDate,
      })),
      referralProfits,
    };

    // Send the response
    res.status(200).json(response);

  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};





