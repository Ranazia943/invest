import { Navigate } from "react-router-dom";
import { useAdminAuthContext } from "./AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { adminUser } = useAdminAuthContext();
  return adminUser ? children : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;
