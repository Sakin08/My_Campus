// src/pages/Home.jsx
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AVATAR_URL = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=6366f1&color=fff&size=128`;

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ────── Welcome Card ────── */}
        <div className="bg-white shadow-md rounded-xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start md:space-x-8">
          <img
            src={user?.avatar || AVATAR_URL(user?.name)}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 mb-4 md:mb-0"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome, {user?.name}!</h1>
            <p className="text-gray-600 mb-3">{user?.email}</p>
            <Link
              to="/profile"
              className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Edit Profile →
            </Link>
          </div>
        </div>

        {/* ────── User Info Grid ────── */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6 flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Account Details</h2>
            <p><strong>Registration No:</strong> {user?.regNo}</p>
            <p><strong>Role:</strong> <span className="text-indigo-600 capitalize">{user?.role}</span></p>
            <p><strong>Department:</strong> {user?.department || "N/A"}</p>
            <p><strong>Batch:</strong> {user?.batch || "N/A"}</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
            <Link
              to="/profile"
              className="w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Edit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ────── Optional Dashboard or Shortcuts ────── */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Dashboard</h2>
          <p className="text-gray-600">Welcome to CampusHub! Use the navigation above to access your courses, attendance, and other resources.</p>
        </div>
      </div>
    </div>
  );
}
