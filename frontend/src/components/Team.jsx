import { useState, useEffect } from "react";
import { useAuthContext } from "../authcontext/AuthContext";

const Teams = () => {
  const { authUser } = useAuthContext(); // Get the current user from context
  const [teamData, setTeamData] = useState({});

  useEffect(() => {
    if (authUser) {
      const fetchTeamData = async () => {
        try {
          const token = authUser.token || localStorage.getItem("token");

          if (!token) {
            console.error("No token found, authorization denied.");
            return;
          }
          const baseURL = import.meta.env.VITE_API_BASE_URL;
          const response = await fetch(`${baseURL}/api/userplan/${authUser._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log("API Response:", data); // Debug response

          if (response.ok) {
            // Adjusting to backend response structure
            setTeamData({
              referralDetails: data.referralProfits.map(ref => ({
                referredUserName: ref.referral.username,
                referredPlans: ref.plans.map(plan => ({
                  planName: plan.planName || "N/A",
                  planPrice: plan.planPrice || 0,
                })),
                referrerProfit: ref.totalReferralProfit,
              })),
              totalReferralProfit: data.totalReferralProfit,
            });
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
      };

      fetchTeamData();
    }
  }, [authUser]);

  return (
    <div>
      <div className="wrapper">
        <div className="cards space-y-4 w-[95%] md:w-[90%] mx-auto mt-20">
          {/* Display total referral profit */}
          {teamData.totalReferralProfit !== undefined && (
            <div className="mt-6 text-center">
              <h2 className="text-lg font-semibold">Total Referral Profit: Rs. {teamData.totalReferralProfit}</h2>
            </div>
          )}

          {/* Check if referralDetails exists */}
          {teamData.referralDetails && teamData.referralDetails.length > 0 ? (
            teamData.referralDetails.map((referral, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-duration="1500"
                className="card border flex-1 rounded-lg px-2 py-4 shadow-lg duration-300 hover:-translate-y-2 hover:shadow-green-100 flex justify-between items-center"
              >
                <div className="flex items-center gap-4 md:gap-16">
                  <img
                    src="/images/teams.png"
                    className="w-12 h-12 ml-2 md:ml-10 hover:scale-105 duration-300"
                    alt={referral.referredUserName}
                  />
                  <div>
                    <h2 className="text-base md:text-lg lg:text-xl font-[500]">{referral.referredUserName}</h2>
                  </div>
                </div>
                <div className="text-end">
                  {referral.referredPlans.map((plan, planIndex) => (
                    <div key={planIndex} className="mb-4">
                      <p className="text-lg font-[400] text-gray-500">Invest Amount</p>
                      <p className="text-lg text-green-400 font-[400] mb-1">
                        Rs. {plan.planPrice}
                      </p>
                      <p className="text-sm text-gray-400">Plan: {plan.planName}</p>
                    </div>
                  ))}
                  <p className="text-lg text-gray-600 font-[400] mt-2">
                    Total Profit Earned: Rs. 
                    <small className="text-green-400 font-[600]">{referral.referrerProfit}</small>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No team members found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
