import { Navigate } from "react-router-dom";

function ProtectedRoutes({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
