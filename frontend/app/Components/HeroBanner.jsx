// components/HeroBanner.jsx
import React from "react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-indigo-50 via-white to-green-50 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-100 rounded-full opacity-30 blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center rounded-3xl bg-white/70 shadow-xl backdrop-blur-md border border-indigo-100">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg">
          Organize Your Workflow <br className="hidden md:block" />
          <span className="text-green-500">Across Organizations</span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto">
          Effortlessly manage tasks, join multiple organizations, and track your progress—all in one beautiful Kanban board.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-indigo-800 transition-all duration-200 text-lg"
          >
            Get Started
          </Link>
          <Link
            href="/features"
            className="px-8 py-3 bg-white/80 border border-indigo-300 text-indigo-700 font-semibold rounded-full shadow hover:bg-indigo-50 hover:text-indigo-900 transition-all duration-200 text-lg"
          >
            See Features
          </Link>
        </div>
        {/* Illustration */}
        <div className="mt-12 flex justify-center">
          <svg
            className="w-72 h-40 md:w-96 md:h-52"
            viewBox="0 0 400 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Kanban Columns */}
            <rect x="20" y="40" width="80" height="140" rx="14" fill="#EEF2FF" />
            <rect x="110" y="20" width="80" height="180" rx="14" fill="#D1FAE5" />
            <rect x="200" y="60" width="80" height="120" rx="14" fill="#E0E7FF" />
            <rect x="290" y="30" width="80" height="170" rx="14" fill="#A7F3D0" />
            {/* Cards */}
            <rect x="35" y="60" width="50" height="20" rx="6" fill="#6366F1" opacity="0.8" />
            <rect x="35" y="90" width="50" height="20" rx="6" fill="#4ADE80" opacity="0.8" />
            <rect x="125" y="40" width="50" height="20" rx="6" fill="#4ADE80" opacity="0.8" />
            <rect x="125" y="80" width="50" height="20" rx="6" fill="#6366F1" opacity="0.8" />
            <rect x="210" y="80" width="50" height="20" rx="6" fill="#6366F1" opacity="0.8" />
            <rect x="300" y="50" width="50" height="20" rx="6" fill="#4ADE80" opacity="0.8" />
            {/* Dots */}
            <circle cx="60" cy="190" r="4" fill="#6366F1" />
            <circle cx="340" cy="190" r="4" fill="#4ADE80" />
          </svg>
        </div>
      </div>
    </section>
  );
}
