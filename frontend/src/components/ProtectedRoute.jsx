import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    const goToLogin = window.confirm(
      "🔒 Please login to access this feature."
    );

    if (goToLogin) {
      return <Navigate to="/login" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;