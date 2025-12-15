import React, { useState } from "react";
import { FaUser, FaBook, FaClipboardList } from "react-icons/fa";
import UsersManagement from "./components/UsersManagement";
import ManageBooks from "./components/ManageBooks";
import MyProfile from "./page/MyProfile";

const AdminDashboard = () => {
  // ✅ Default tab: All Users
  const [activeTab, setActiveTab] = useState("All Users");

  const tabs = [
    { name: "All Users", icon: <FaUser /> },
    { name: "Manage Books", icon: <FaBook /> },
    { name: "My Profile", icon: <FaClipboardList /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-6 gap-6">
        
        {/* Sidebar */}
        <div className="bg-white w-full md:w-64 rounded-xl shadow-lg p-4 md:h-[80vh] md:sticky top-4">
          <h2 className="text-xl font-bold text-purple-600 mb-4">
            Admin Dashboard
          </h2>

          <div className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                  ${
                    activeTab === tab.name
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-purple-100"
                  }
                `}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-white rounded-xl shadow-lg">
          {activeTab === "All Users" && (
            <>
              <h2 className="text-2xl font-bold text-purple-600">
                All Users
              </h2>
              <p className="mt-2 text-gray-700">
                Here are all the registered users.
              </p>
              <UsersManagement />
            </>
          )}

          {activeTab === "Manage Books" && (
            <>
              <h2 className="text-2xl font-bold text-pink-600">
                Manage Books
              </h2>
              <p className="mt-2 text-gray-700">
                Update book information.
              </p>
              <ManageBooks />
            </>
          )}

          {activeTab === "My Profile" && (
            <>
              <h2 className="text-2xl font-bold text-blue-600">
                My Profile
              </h2>
              <p className="mt-2 text-gray-700">
                View and update your profile information.
              </p>
              <MyProfile />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
