import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
