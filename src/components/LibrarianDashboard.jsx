import React, { useState } from "react";
import { FaUser, FaBook, FaClipboardList } from "react-icons/fa";
import AddBook from "./AddBook";
import MyBooks from "./MyBooks";
import LibrarianOrders from "./LibrarianOrders";


const LibrarianDashboard = () => {
  // ✅ Default tab: Add Book
  const [activeTab, setActiveTab] = useState("Add Book");

  const tabs = [
    { name: "Add Book", icon: <FaClipboardList /> },
    { name: "My Books", icon: <FaUser /> },
    { name: "Orders", icon: <FaBook /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-6 gap-6">

        {/* Sidebar */}
        <div className="bg-white w-full md:w-64 rounded-xl shadow-lg p-4 md:h-[80vh] md:sticky top-4">
          <h2 className="text-xl font-bold text-purple-600 mb-4">
            Librarian Dashboard
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
          {activeTab === "Add Book" && <AddBook />}

          {activeTab === "My Books" && <MyBooks />}

          {activeTab === "Orders" && <LibrarianOrders />}
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
