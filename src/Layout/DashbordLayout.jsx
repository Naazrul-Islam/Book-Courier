import React from 'react';
import Navber from '../components/Navber';
import { NavLink, Outlet, useLocation } from 'react-router';

const DashbordLayout = () => {
  const location = useLocation();

  // determine which tab is active
  const current = location.pathname;

  return (
    <div>
      <Navber />

      <div className="flex justify-center mt-5">
        <div className="tabs tabs-boxed">
          {/* USER TAB */}
          <NavLink to="/dashboard">
            <input
              type="radio"
              name="dashboard-tabs"
              className="tab"
              aria-label="User Dashboard"
              checked={current === "/dashboard"}
              readOnly
            />
          </NavLink>

          {/* LIBRARIAN TAB */}
          <NavLink to="/dashboard/librarian">
            <input
              type="radio"
              name="dashboard-tabs"
              className="tab"
              aria-label="Librarian Dashboard"
              checked={current === "/dashboard/librarian"}
              readOnly
            />
          </NavLink>

          {/* ADMIN TAB */}
          <NavLink to="/dashboard/admin">
            <input
              type="radio"
              name="dashboard-tabs"
              className="tab"
              aria-label="Admin Dashboard"
              checked={current === "/dashboard/admin"}
              readOnly
            />
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default DashbordLayout;
