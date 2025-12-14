import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navber from "../components/Navber";
import { Auth } from "../auth/AuthContext";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const { role, loading } = useContext(Auth);
  const navigate = useNavigate();

  // Auto redirect based on role
  useEffect(() => {
    if (!loading) {
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "librarian") navigate("/dashboard/librarian");
      else navigate("/dashboard/user");
    }
  }, [role, loading, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navber />

      {/* Dashboard Header Tabs */}
      <div className="w-full bg-base-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 py-3">
          <div className="flex justify-center sm:justify-start overflow-x-auto">
            <div className="tabs tabs-boxed whitespace-nowrap">
              {role === "user" && (
                <NavLink
                  to="/dashboard/user"
                  className={({ isActive }) =>
                    isActive ? "tab tab-active" : "tab"
                  }
                >
                  User Dashboard
                </NavLink>
              )}

              {role === "librarian" && (
                <NavLink
                  to="/dashboard/librarian"
                  className={({ isActive }) =>
                    isActive ? "tab tab-active" : "tab"
                  }
                >
                  Librarian Dashboard
                </NavLink>
              )}

              {role === "admin" && (
                <NavLink
                  to="/dashboard/admin"
                  className={({ isActive }) =>
                    isActive ? "tab tab-active" : "tab"
                  }
                >
                  Admin Dashboard
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
