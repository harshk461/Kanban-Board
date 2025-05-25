'use client'

// components/Navbar.jsx
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate=useRouter();
  return (
    <nav className="w-full bg-white/70 backdrop-blur-md shadow-lg px-8 py-3 flex items-center justify-between rounded-b-2xl border-b border-indigo-100">
      {/* Left: Features */}
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-extrabold text-indigo-700 tracking-tight drop-shadow">
            KanbanPro
          </span>
          <span className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-600 transition"></span>
        </Link>
        <Link
          href="/features"
          className="text-gray-500 hover:text-indigo-600 font-medium transition-colors duration-200 px-2 py-1 rounded hover:bg-indigo-50"
        >
          Features
        </Link>
        <Link
          href="/trackers"
          className="text-gray-500 hover:text-indigo-600 font-medium transition-colors duration-200 px-2 py-1 rounded hover:bg-indigo-50"
        >
          Trackers
        </Link>
        <Link
          href="/pricing"
          className="text-gray-500 hover:text-indigo-600 font-medium transition-colors duration-200 px-2 py-1 rounded hover:bg-indigo-50"
        >
          Pricing
        </Link>
      </div>

      {/* Right: Auth/Profile */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <button
            onClick={()=>navigate.push("/auth/login")}
            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold rounded-full shadow hover:from-indigo-600 hover:to-indigo-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Login
          </button>
        ) : (
          <>
            <button
              onClick={()=>{}}
              className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full shadow hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Join Org
            </button>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="w-11 h-11 rounded-full border-2 border-indigo-500 shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </button>
              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-indigo-100 z-50">
                  <div className="px-4 py-3 border-b border-indigo-50">
                    <div className="font-semibold text-indigo-700">{user.name}</div>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-b transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => alert("Logout")}
                    className="w-full text-left px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-b transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
