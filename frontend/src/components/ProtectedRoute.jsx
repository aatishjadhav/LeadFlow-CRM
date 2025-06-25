import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccessDenied from "./AccessDenied";

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const user = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user.role)) return <AccessDenied/>;

  return <Component />;
};

export default ProtectedRoute;
