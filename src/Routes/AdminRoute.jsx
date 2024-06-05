import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Components/Hooks/useAdmin";
import useAuth from "../Components/Hooks/useAuth";

const AdminRoute = (children) => {
  const [user, loading] = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
