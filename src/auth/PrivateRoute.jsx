import { useContext } from "react";
import { Navigate } from "react-router";
import { Auth } from "./AuthContext";


const PrivateRoute = ({ children }) => {
  const { user } = useContext(Auth);
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
