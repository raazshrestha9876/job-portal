import { useAuthenticated } from "@/hooks/useAuthenticated";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  
  const isAuthenticated = useAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
