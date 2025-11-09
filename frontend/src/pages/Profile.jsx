// src/pages/Profile.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMe, updateProfile } from "../api/auth";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = (name = "User") =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=150`;

export default function Profile() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    regNo: "",
    department: "",
    batch: "",
    currentPassword: "",
    newPassword: "",
    avatar: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR());
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load profile
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMe();
        const u = res.data.user;
        setForm({
          name: u.name || "",
          email: u.email || "",
          regNo: u.regNo || "",
          department: u.department || "",
          batch: u.batch || "",
          currentPassword: "",
          newPassword: "",
          avatar: u.avatar || "",
        });
        setAvatarPreview(u.avatar || DEFAULT_AVATAR(u.name));
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setFetching(false);
      }
    };
    if (user) load();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be < 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setAvatarPreview(base64);
      setForm({ ...form, avatar: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: form.name,
      email: form.email,
      department: form.department,
      batch: form.batch,
    };

    if (form.avatar && form.avatar !== user?.avatar) {
      data.avatar = form.avatar;
    }

    if (form.currentPassword && form.newPassword) {
      data.currentPassword = form.currentPassword;
      data.newPassword = form.newPassword;
    }

    try {
      const res = await updateProfile(data);
      login(res.data.token, res.data.user);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button onClick={() => navigate("/")} className="text-gray-500 hover:text-gray-700">
            ← Back
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img
              src={avatarPreview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v6m-3-3h6" />
              </svg>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <p className="text-sm text-gray-500 mt-2">Click to change (max 5MB)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          {["name", "email"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}

          {/* Reg No */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
              type="text"
              value={form.regNo}
              disabled
              className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
            />
          </div>

          {/* Department & Batch */}
          {["department", "batch"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}

          {/* Role */}
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {user?.role?.toUpperCase()}
            </span>
          </div>

          {/* Password */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Change Password (Optional)</h3>
            <div className="space-y-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={form.currentPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password (min 6 chars)"
                value={form.newPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}