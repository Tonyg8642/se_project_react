// 📁 src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

// ✅ Use singular name to match import in App.jsx
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
