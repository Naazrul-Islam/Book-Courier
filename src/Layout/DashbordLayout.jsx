import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navber from "../components/Navber";
import { Auth } from "../auth/AuthContext";

const DashboardLayout = () => {
  const { role, loading } = useContext(Auth);
  const navigate = useNavigate();

  // Auto redirect based on role
  useEffect(() => {
    if (!loading) {
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "librarian") navigate("/dashboard/librarian");
      else navigate("/dashboard/User"); // default user
    }
  }, [role, loading, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Navber />

      <div className="flex justify-center mt-5">
        <div className="tabs tabs-boxed">
          {/* User Tab */}
          {(role === "user") && (
            <NavLink
              to="/dashboard/user"
              className={({ isActive }) => (isActive ? "tab tab-active" : "tab")}
            >
              User
            </NavLink>
          )}

          {/* Librarian Tab */}
          {(role === "librarian") && (
            <NavLink
              to="/dashboard/librarian"
              className={({ isActive }) => (isActive ? "tab tab-active" : "tab")}
            >
              Librarian
            </NavLink>
          )}

          {/* Admin Tab */}
          {role === "admin" && (
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) => (isActive ? "tab tab-active" : "tab")}
            >
              Admin
            </NavLink>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
