import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/userplan/${id}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails) return <div>Loading...</div>;

  const { user, totalReferrals, referrals, totalBalance, totalReferralProfit, purchasedPlans } = userDetails;

  return (
    <div className="m-4">
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="border p-4 rounded-lg bg-white">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Referral Code:</strong> {user.referralCode}</p>
        <p><strong>Total Balance:</strong> ${totalBalance}</p>
        <p><strong>Total Referral Profit:</strong> ${totalReferralProfit}</p>
        <p><strong>Total Referrals:</strong> {totalReferrals}</p>
      </div>

      <h3 className="text-lg font-bold mt-6 mb-2">Referrals</h3>
      <ul className="list-disc ml-5">
        {referrals.map((referral, index) => (
          <li key={index}>
            <p><strong>Username:</strong> {referral.username}</p>
            <p><strong>Email:</strong> {referral.email}</p>
            <p><strong>Referral Code:</strong> {referral.referralCode}</p>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6 mb-2">Purchased Plans</h3>
      <ul className="list-disc ml-5">
        {purchasedPlans.map((plan, index) => (
          <li key={index}>
            <p><strong>Plan Name:</strong> {plan.name}</p>
            <p><strong>Price:</strong> ${plan.price}</p>
            <p><strong>Daily Profit:</strong> ${plan.dailyProfit}</p>
            <p><strong>Duration:</strong> {plan.duration} days</p>
            <p><strong>Total Profit:</strong> ${plan.totalProfit}</p>
            <p><strong>State:</strong> {plan.state}</p>
            <p><strong>Start Date:</strong> {new Date(plan.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(plan.endDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
