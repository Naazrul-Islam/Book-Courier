import { useContext } from "react";
import { Navigate } from "react-router";
import { Auth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const authContext = useContext(Auth);

  
  const { user } = authContext;

  if (!user) return <Navigate to="/auth" />;

  return children;
};

export default PrivateRoute;
