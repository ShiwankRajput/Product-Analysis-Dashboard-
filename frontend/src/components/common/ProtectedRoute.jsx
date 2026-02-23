import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // logged in
  return children;
};

export default ProtectedRoute;