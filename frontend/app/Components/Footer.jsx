// components/Footer.jsx
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin, FaBookOpen, FaRegLifeRing } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white/90 border-t border-indigo-100 py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Brand & tagline */}
        <div className="mb-8 md:mb-0">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl font-extrabold text-indigo-700 tracking-tight">KanbanPro</span>
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          </div>
          <p className="text-gray-500 max-w-xs text-sm">
            Organize, collaborate, and achieve more—beautifully and simply.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-8 flex-wrap">
          <div>
            <h4 className="text-indigo-700 font-semibold mb-2">Product</h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-indigo-600 transition">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-indigo-600 transition">Updates</Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-indigo-600 transition">API Docs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-indigo-700 font-semibold mb-2">Resources</h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>
                <Link href="/help-center" className="hover:text-indigo-600 transition flex items-center gap-1">
                  <FaRegLifeRing className="inline text-base" /> Help Center
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-indigo-600 transition">Profile & Settings</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-indigo-700 font-semibold mb-2">Legal</h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-600 transition">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-indigo-700 font-semibold mb-2">Connect</h4>
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
      </div>
      <div className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} KanbanPro. All rights reserved.
      </div>
    </footer>
  );
}
