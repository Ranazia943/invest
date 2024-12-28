import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../authcontext/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();  // Add navigate here

  const signup = async ({ email, username, password, confirmPassword, referredBy }) => {
    const success = handleInputErrors({ email, username, password, confirmPassword });
    if (!success) return false;

    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, confirmPassword, referredBy }),
      });

      const data = await res.json();
      console.log('Registration Response:', data); // Log the full response to debug

      if (!res.ok) {
        throw new Error(data.message || "An error occurred during registration");
      }

      if (data.token) {
        Cookies.set("token", data.token, { expires: 7, path: "" });  // Save token in cookies
        localStorage.setItem("token", data.token); // Save token in localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user data
      } else {
        console.error('No token found in registration response data');
      }

      setAuthUser({ ...data.user, token: data.token });

      // Navigate to the login page after successful registration
      navigate("/login");

      return true; // Return true if successful
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ email, username, password, confirmPassword }) {
  if (!email || !username || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
