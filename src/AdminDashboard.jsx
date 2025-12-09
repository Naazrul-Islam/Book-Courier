import React, { useState } from "react";
import { FaUser, FaBook, FaClipboardList } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("My Orders");

  const tabs = [
    { name: "All Users", icon: <FaClipboardList /> },
    { name: "Manage Books", icon: <FaUser /> },
    { name: "My Profile", icon: <FaBook /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
    

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-6">
        {/* Sidebar */}
        <div className="bg-white w-full md:w-64 rounded-xl shadow-lg p-4 md:h-[80vh] md:sticky top-4 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-purple-600 mb-4">Admin Dashboard</h2>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${
                  activeTab === tab.name
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-purple-100"
                }
              `}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 mt-6 md:mt-0 md:ml-6 p-6 bg-white rounded-xl shadow-lg transition-all duration-500">
          {activeTab === "All Users" && (
            <div>
              <h2 className="text-2xl font-bold text-purple-600">All Users</h2>
              <p className="mt-2 text-gray-700">Here are all the registered users.</p>
              {/* Add Table or Cards for Users here */}
            </div>
          )}
          {activeTab === "Manage Books" && (
            <div>
              <h2 className="text-2xl font-bold text-pink-600">Manage Books</h2>
              <p className="mt-2 text-gray-700">Update book information.</p>
              {/* Add Book Form / Modal here */}
            </div>
          )}
          {activeTab === "My Profile" && (
            <div>
              <h2 className="text-2xl font-bold text-blue-600">My Profile</h2>
              <p className="mt-2 text-gray-700">View and update your profile information.</p>
              {/* Add Profile Form / Modal here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
