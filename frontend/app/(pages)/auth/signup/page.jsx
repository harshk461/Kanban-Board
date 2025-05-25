'use client'

import React, { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrate with your signup logic
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-green-50 relative py-[50px]">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-100 rounded-full opacity-20 blur-2xl"></div>

      <div className="z-10 w-full max-w-md mx-auto bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-2xl px-8 py-12">
        <div className="flex flex-col items-center mb-8">
          <span className="text-3xl font-extrabold text-indigo-700 mb-2">KanbanPro</span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create your account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Picker */}
          <div className="flex flex-col items-center">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center overflow-hidden shadow mb-2 hover:opacity-80 transition">
                {preview ? (
                  <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl text-indigo-400">+</span>
                )}
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            <span className="text-sm text-gray-500">Choose a profile photo</span>
          </div>
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg transition"
              placeholder="Your name"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg transition"
              placeholder="you@email.com"
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg transition"
              placeholder="Phone number"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-8 text-center text-gray-600 text-base">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-600 font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
