// src/pages/common/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // while the auth status is being checked, optionally show nothing or a loader
  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
