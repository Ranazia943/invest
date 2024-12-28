import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../authcontext/AuthContext";
import Cookies from "js-cookie";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;

    setLoading(true);
    try {
      // Use the environment variable directly
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || data.message === "Invalid email or password.") {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      console.log("Login Response:", data);

      // Save the token in cookies
      if (data.token) {
        Cookies.set("token", data.token, { expires: 7, path: "" });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error("No token found in response data");
      }

      setAuthUser({ ...data.user, token: data.token });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
