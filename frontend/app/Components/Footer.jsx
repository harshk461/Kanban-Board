// components/Footer.jsx
import React from "react";
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-indigo-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-extrabold text-indigo-700 tracking-tight">KanbanPro</span>
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-6 text-gray-600 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link href="/features" className="hover:text-indigo-600 transition">Features</Link>
          <Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link>
        </nav>

        {/* Socials */}
        <div className="flex space-x-5">
          <a href="https://twitter.com/" target="_blank" rel="noopener" className="text-indigo-500 hover:text-green-500 transition text-xl">
            <FaTwitter />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener" className="text-indigo-500 hover:text-green-500 transition text-xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener" className="text-indigo-500 hover:text-green-500 transition text-xl">
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} KanbanPro. All rights reserved.
      </div>
    </footer>
  );
}
