// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router";

export default function Sidebar({ collapsed, setCollapsed, userRole }) {
  const links = [
    { name: "Overview", path: "/dashboard", roles: ["user", "librarian", "admin"] },
    { name: "My Orders", path: "/dashboard/user", roles: ["user"] },
    { name: "Add Book", path: "/dashboard/librarian", roles: ["librarian"] },
    { name: "Manage Orders", path: "/dashboard/librarian/orders", roles: ["librarian"] },
    { name: "All Users", path: "/dashboard/admin", roles: ["admin"] },
    { name: "Manage Books", path: "/dashboard/admin/manage-books", roles: ["admin"] },
  ];

  return (
    <aside
      className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 text-center font-bold border-b border-gray-700">
        {collapsed ? "BC" : "BookCourier"}
      </div>
      <nav className="mt-4 flex flex-col gap-2">
        {links
          .filter((link) => link.roles.includes(userRole))
          .map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              {collapsed ? link.name[0] : link.name}
            </Link>
          ))}
      </nav>
    </aside>
  );
}
