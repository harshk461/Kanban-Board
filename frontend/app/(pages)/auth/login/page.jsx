'use client'

import React, { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrate with your authentication logic
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-green-50 relative">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-100 rounded-full opacity-20 blur-2xl"></div>

      <div className="z-10 w-full max-w-md mx-auto bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-2xl px-8 py-12">
        <div className="flex flex-col items-center mb-8">
          <span className="text-3xl font-extrabold text-indigo-700 mb-2">KanbanPro</span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Sign in to your account</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg transition"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg transition"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-between items-center">
            <Link href="/forgot-password" className="text-indigo-500 hover:underline text-sm">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-indigo-100"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-indigo-100"></div>
        </div>
        <button
          className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-indigo-200 text-indigo-700 font-semibold rounded-full shadow hover:bg-indigo-50 transition text-lg"
          onClick={() => alert("Social login")}
        >
          <FaGoogle className="text-xl" /> Sign in with Google
        </button>
        <div className="mt-8 text-center text-gray-600 text-base">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-green-600 font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
