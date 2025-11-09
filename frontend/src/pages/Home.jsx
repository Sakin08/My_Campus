// src/pages/Home.jsx
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AVATAR_URL = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=6366f1&color=fff&size=64`;

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-6 mb-6">
            <img
              src={user?.avatar || AVATAR_URL(user?.name)}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <Link to="/profile" className="text-indigo-600 hover:underline font-medium">
              Edit Profile →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2 text-gray-700">
              <p><strong>Reg No:</strong> {user?.regNo}</p>
              <p><strong>Role:</strong> <span className="text-indigo-600 capitalize">{user?.role}</span></p>
            </div>
            <div className="space-y-2 text-gray-700">
              {user?.department && <p><strong>Department:</strong> {user?.department}</p>}
              {user?.batch && <p><strong>Batch:</strong> {user?.batch}</p>}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}