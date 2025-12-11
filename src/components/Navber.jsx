import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // ✅ react-router-dom
import { MdManageAccounts } from "react-icons/md";
import { Auth } from "../auth/AuthContext";

const Navber = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, role, logout } = useContext(Auth); // ✅ add role
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-blue-900/70 to-purple-900/70 text-white backdrop-blur-md shadow-md py-4 sticky top-0 z-50">
      
      {/* Left */}
      <div className="navbar-start">
        <Link
          to={"/"}
          className="btn btn-ghost text-2xl flex items-center gap-2 font-bold"
        >
          <MdManageAccounts className="text-3xl text-purple-300" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            BookCourier
          </h1>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5 font-semibold">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/books"}>Books</NavLink>
          </li>

          {/* Role-based Dashboard */}
          {user && role === "admin" && (
            <li>
              <NavLink to={"/dashboard/admin"}>Admin Dashboard</NavLink>
            </li>
          )}
          {user && role === "librarian" && (
            <li>
              <NavLink to={"/dashboard/librarian"}>Librarian Dashboard</NavLink>
            </li>
          )}
          {user && role === "user" && (
            <li>
              <NavLink to={"/dashboard"}>User Dashboard</NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex gap-3 items-center">
        {/* Theme Toggle */}
        <label className="cursor-pointer">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={theme === "dark"}
            className="toggle bg-sky-400"
          />
        </label>

        {/* User Info */}
        {user ? (
          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/6gR0T7P/default-avatar.png"}
                alt="User"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer hover:scale-105 transition"
              />
              {openDropdown && (
                <div className="absolute right-0 mt-3 w-36 bg-white/20 backdrop-blur-md text-white rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                  <Link
                    to="/profile"
                    onClick={() => setOpenDropdown(false)}
                    className="block px-4 py-2 hover:bg-white/30 transition"
                  >
                    {user.displayName || "My Profile"} <span>(profile)</span>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-primary btn-error text-white hover:text-black"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to={"/auth"} className="btn btn-primary">
              SignIn
            </Link>
            <Link to={"/auth/register"} className="btn btn-primary">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
