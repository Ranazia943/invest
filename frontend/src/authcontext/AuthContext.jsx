import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

  // Sync authUser and authToken with localStorage whenever they change
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
    } else {
      localStorage.removeItem("token");
    }

    if (authUser) {
      localStorage.setItem("user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [authUser, authToken]);

  // Handle logout
  const logout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthUser(null);
      setAuthToken(null);
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      // Make a request to your backend to logout the user
      const response = await fetch(`${baseURL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/login"); // Redirect to login page
      } else {
        const data = await response.json();
        console.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, authToken, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
