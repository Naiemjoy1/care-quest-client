import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
          role="status"
        >
          <span className="loading loading-spinner text-4xl text-primary"></span>
        </div>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
