import UserPlan from '../models/userplan.model.js';
import Plan from '../models/plan.model.js';
import User from '../models/user.model.js';

export const getUserStatistics = async (req, res) => {
  try {
    // 1. Total number of users
    const totalUsers = await User.countDocuments();

    // 2. Total sum of investments from all active user plans (active state only)
    const activeUserPlans = await UserPlan.aggregate([
      { $match: { state: 'active' } }, // Only active plans
      { $lookup: { from: 'plans', localField: 'planId', foreignField: '_id', as: 'planDetails' } },
      { $unwind: '$planDetails' }, // Unwind plan details to sum the plan's price
      { $group: { _id: null, totalInvests: { $sum: '$planDetails.price' } } }
    ]);
    const totalInvests = activeUserPlans.length > 0 ? activeUserPlans[0].totalInvests : 0;

    // 3. Total number of plans purchased (all states)
    const totalPlans = await UserPlan.countDocuments();

    // 4. Total number of referred users (those who have a referredBy field)
    const referredUsers = await User.aggregate([
      { $match: { referredBy: { $ne: null } } }, // Filter users who have been referred by someone
      { $group: { _id: null, totalReferredUsers: { $sum: 1 } } } // Count the number of referred users
    ]);
    const totalReferredUsers = referredUsers.length > 0 ? referredUsers[0].totalReferredUsers : 0;

    // Return the aggregated data in the response
    return res.status(200).json({
      totalUsers,
      totalInvests: `Rs. ${totalInvests.toLocaleString()}`, // Format totalInvests to currency
      totalPlans,
      totalReferredUsers,
    });
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
