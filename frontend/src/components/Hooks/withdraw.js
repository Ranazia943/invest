// hooks/withdraw.js
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../../authcontext/AuthContext"; // Adjust path if necessary

const useWithdrawRequest = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const { authUser } = useAuthContext();  // Use the auth context to get the user
  const token = localStorage.getItem("token");  // Access token directly from localStorage

  const withdrawRequest = async (amount, paymentMethod, gatewayAccountName, gatewayAccountNumber) => {
    if (!amount || !paymentMethod || !gatewayAccountName || !gatewayAccountNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!token || !authUser || !authUser._id) {
      toast.error("Authentication token missing or user not authenticated.");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        amount,
        paymentGateway: paymentMethod,
        gatewayAccountName,
        gatewayAccountNumber,
      };

      console.log("Submitting request with the following data: ", requestData); // Debugging line
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(`${baseURL}/api/withdrawl/request/${authUser._id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Set the token in the Authorization header
          },
        }
      );

      setSuccessMessage(response.data.message);  // Set success message on successful request
      setError('');  // Clear error message
    } catch (err) {
      console.error("Error:", err);
      setError(err.response ? err.response.data.message : "Server error");  // Handle errors
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return { loading, successMessage, error, withdrawRequest };
};

export default useWithdrawRequest;
