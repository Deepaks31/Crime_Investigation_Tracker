import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center bg-white shadow p-4 px-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Criminal Case Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Edit Evidence
          </button>

          {role === "writer" && (
            <button
              onClick={() => navigate("/create-case")}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Create Case
            </button>
          )}

          {role === "admin" && (
            <button
            onClick={() => navigate("/admin/cases")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Assign case
          </button>
          )}
          {role === "admin" && (
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Add User
            </button>
          )}

          {role === "user" && (
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Solve Case
            </button>
          )}

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-3xl text-gray-700 hover:text-gray-900 transition"
            >
              <FaUserCircle />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 text-gray-800">
        <h2 className="text-lg font-semibold">Welcome, {role}!</h2>
        <p className="mt-2">
          Use the buttons above to perform your role-specific actions.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
