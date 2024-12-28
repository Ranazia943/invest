import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminAuthContext = createContext();

export const useAdminAuthContext = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthContextProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem("adminUser")) || null
  );
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || null);

  const navigate = useNavigate();

  // Sync adminUser and adminToken with localStorage whenever they change
  useEffect(() => {
    if (adminToken) {
      localStorage.setItem("adminToken", adminToken);
    } else {
      localStorage.removeItem("adminToken");
    }

    if (adminUser) {
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
    } else {
      localStorage.removeItem("adminUser");
    }
  }, [adminUser, adminToken]);

  // Handle admin logout
  const logoutAdmin = async () => {
    try {
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminToken");
      setAdminUser(null);
      setAdminToken(null);
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      // Make a request to your backend to logout the admin user
      const response = await fetch(`${baseURL}/api/admin/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/admin/dashboard"); // Redirect to admin login page
      } else {
        const data = await response.json();
        console.error(data.message || "Admin logout failed");
      }
    } catch (error) {
      console.error("Error logging out admin:", error);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{ adminUser, setAdminUser, adminToken, setAdminToken, logoutAdmin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
