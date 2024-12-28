import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../authcontext/AuthContext";

const useReferralData = () => {
  const { authUser } = useAuthContext(); // Destructure authUser from context
  const [userReferral, setUserReferral] = useState({}); // State for referral data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchReferralData = async () => {
      if (!authUser || !authUser.id) {
        console.error("authUser or authUser.id is missing");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          console.error("Token is missing");
          setLoading(false);
          return;
        }
        const baseURL = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.get(`${baseURL}/api/auth/user/${authUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers
            },
          }
        );

        if (response.status === 200) {
          setUserReferral(response.data); // Set referral data from response
        } else {
          console.error("Failed to fetch referral data");
          setError("Failed to fetch referral data");
        }
      } catch (error) {
        console.error("Error fetching referral data:", error.message); // Improved error logging
        setError("Error fetching referral data");
      } finally {
        setLoading(false); // End loading state
      }
    };

    if (authUser && authUser.id) {
      fetchReferralData();
    }
  }, [authUser]); // Re-run when authUser changes

  return { userReferral, loading, error };
};

export default useReferralData;
