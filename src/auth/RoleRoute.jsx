import { useContext } from "react";
import { Navigate } from "react-router";
import { Auth } from "./AuthContext";

const RoleRoute = ({ children, allow }) => {
  const authContext = useContext(Auth);

  if (!authContext) return <Navigate to="/auth" />;

  const { user, role } = authContext;

  if (!user) return <Navigate to="/auth" />;
  if (!role || !allow.includes(role)) return <Navigate to="/dashboard" />;

  return children;
};

export default RoleRoute;
