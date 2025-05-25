'use client'

import React, { useState } from "react";

export default function ProfilePage() {
  // Example state, replace with your API/user context
  const [avatar, setAvatar] = useState("https://randomuser.me/api/portraits/men/32.jpg");
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "Alex Johnson",
    email: "alex@email.com",
    phone: "+1 555-123-4567",
    about: "Kanban enthusiast. Loves productivity and teamwork.",
    notifications: true,
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      // TODO: Upload avatar to server
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleToggleNotifications = () => {
    setForm((f) => ({ ...f, notifications: !f.notifications }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate and update user info via API
    if (form.password && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSuccess("Profile updated successfully!");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-16 px-4">
      <section className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-6 text-center">
          Profile & Settings
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-2">
            <label htmlFor="avatar-upload" className="cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-indigo-300 flex items-center justify-center overflow-hidden shadow-lg hover:opacity-80 transition">
                <img
                  src={preview || avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-indigo-600 mt-2 group-hover:underline">
                Change Photo
              </span>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">About</label>
              <input
                name="about"
                type="text"
                value={form.about}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                placeholder="Short bio"
              />
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="flex items-center gap-4">
            <input
              id="notifications"
              type="checkbox"
              checked={form.notifications}
              onChange={handleToggleNotifications}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="notifications" className="text-gray-700 font-medium">
              Email me about important updates and activity
            </label>
          </div>

          {/* Password Update */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                placeholder="Leave blank to keep current"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                placeholder="Repeat new password"
              />
            </div>
          </div>

          {/* Feedback */}
          {success && <div className="text-green-600 text-center">{success}</div>}
          {error && <div className="text-red-600 text-center">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
          >
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
}
