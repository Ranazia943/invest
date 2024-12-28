import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from "../authcontext/AuthContext";

const TotalPlan = () => {
  const [userPlans, setUserPlans] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const { authUser } = useAuthContext(); // Authenticated user data from context

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
          const response = await fetch(`${baseURL}/api/userplan/user/${authUser._id}`, {
            method: "GET",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log("API Response:", data);  // Log the response for debugging

          if (response.ok) {
            setUserPlans(data.purchasedPlans);  // Assuming the data has a purchasedPlans array
            setLoading(false);  // Set loading to false once data is fetched
          } else {
            console.error(data.message);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching team data:", error);
          setLoading(false);
        }
      };

      fetchTeamData();
    }
  }, [authUser]);

  return (
    <div>
      <div className="investment mt-20 mx-4 md:mx-10 lg:mx-16 pb-28">
        <h2 className="text-center my-8 text-3xl font-[800] font-sans">My Premium Plans</h2>
        <div className="wrapper grid grid-cols-1 min-[700px]:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : userPlans.length > 0 ? (
            userPlans.map((plan) => (
              <div
                key={plan.planId}
                className="p-4 border max-[700px]:w-[400px] max-[700px]:mx-auto max-[500px]:w-full group rounded-lg hover:-translate-y-2 duration-300 overflow-hidden bg-white"
              >
                <h2 className="text-center font-[700] text-xl my-2 rounded-lg text-white">{plan.name}</h2>
                <div className="wrapp flex justify-between items-end">
                  <div>
                    <p>
                      <span className="text-lg text-black font-[500]">Price : </span>
                      <span className="text-black font-[350] text-base">Rs. {plan.price}</span>
                    </p>
                    <p>
                      <span className="text-lg text-black font-[500]">Duration : </span>
                      <span className="text-black font-[350] text-base">{plan.duration} Days</span>
                    </p>
                    <p>
                      <span className="text-lg text-black font-[500]">Daily Profit : </span>
                      <span className="text-black font-[350] text-base">Rs. {plan.dailyProfit}</span>
                    </p>
                    <p>
                      <span className="text-lg text-black font-[500]">Total Profit : </span>
                      <span className="text-black font-[350] text-base">Rs. {plan.totalProfit}</span>
                    </p>
                    <p>
                      <span className="text-lg text-black font-[500]">Status : </span>
                      <span className={`text-black font-[350] text-base ${plan.state === 'active' ? 'text-green-500' : plan.state === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                        {plan.state.charAt(0).toUpperCase() + plan.state.slice(1)} {/* Capitalize state */}
                      </span>
                    </p>
                    <p>
                      <span className="text-lg text-black font-[500]">Start Date : </span>
                      <span className="text-black font-[350] text-base">{new Date(plan.startDate).toLocaleDateString()}</span>
                    </p>
                    <p>
                      <span className="text-lg text-black font-[500]">End Date : </span>
                      <span className="text-black font-[350] text-base">{new Date(plan.endDate).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <div>
                    {plan.state === 'pending' && (
                      <button className="px-4 py-2 text-lg font-[500] bg-yellow-500 rounded-md text-white group-hover:bg-yellow-700 duration-300">
                        Pending Approval
                      </button>
                    )}
                    {plan.state === 'active' && (
                      <button className="px-4 py-2 text-lg font-[500] bg-green-500 rounded-md text-white group-hover:bg-green-700 duration-300">
                        Active Plan
                      </button>
                    )}
                    {plan.state === 'rejected' && (
                      <button className="px-4 py-2 text-lg font-[500] bg-red-500 rounded-md text-white group-hover:bg-red-700 duration-300">
                        Plan Rejected
                      </button>
                    )}

{plan.state === 'completed' && (
                      <button className="px-4 py-2 text-lg font-[500] bg-gray-500 rounded-md text-white group-hover:bg-gray-400 duration-300">
                        Completed Plan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">You have not purchased any plans yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalPlan;
