'use client'

import React, { useState } from "react";
import { FaSearch, FaQuestionCircle, FaBookOpen, FaEnvelope } from "react-icons/fa";

const docs = [
  {
    icon: <FaBookOpen className="text-2xl text-indigo-600" />,
    title: "Getting Started",
    content:
      "Learn how to create your account, join organizations, and set up your first Kanban board in minutes.",
  },
  {
    icon: <FaQuestionCircle className="text-2xl text-green-500" />,
    title: "Managing Trackers",
    content:
      "Create trackers, customize columns, and organize your workflow for any project or team.",
  },
  {
    icon: <FaBookOpen className="text-2xl text-indigo-600" />,
    title: "Inviting Team Members",
    content:
      "Invite colleagues to your organization, assign roles, and collaborate in real time.",
  },
  {
    icon: <FaQuestionCircle className="text-2xl text-green-500" />,
    title: "Real-Time Collaboration",
    content:
      "See updates instantly, comment on tasks, and stay in sync with your team.",
  },
  {
    icon: <FaBookOpen className="text-2xl text-indigo-600" />,
    title: "Analytics & Reports",
    content:
      "Visualize progress and productivity with built-in analytics and exportable reports.",
  },
  {
    icon: <FaQuestionCircle className="text-2xl text-green-500" />,
    title: "Account & Security",
    content:
      "Manage your profile, change your password, and learn about our security features.",
  },
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const filteredDocs = docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-16 px-4">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          Help Center & Documentation
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Find answers, guides, and tips for getting the most out of KanbanPro.
        </p>
        <div className="flex items-center justify-center max-w-md mx-auto bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-full px-4 py-2 shadow">
          <FaSearch className="text-indigo-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search help articles..."
            className="w-full bg-transparent outline-none text-base text-gray-700"
          />
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">
            No articles found. Try another search.
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.title}
              className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-lg p-6 flex flex-col items-start hover:scale-105 transition-transform duration-200"
            >
              <div className="mb-3">{doc.icon}</div>
              <h3 className="text-lg font-bold text-indigo-700 mb-2">{doc.title}</h3>
              <p className="text-gray-600 text-base">{doc.content}</p>
            </div>
          ))
        )}
      </section>

      {/* Contact Support CTA */}
      <section className="max-w-2xl mx-auto mt-16 text-center">
        <div className="bg-white/90 backdrop-blur-lg border border-green-100 rounded-2xl shadow-lg px-8 py-10 flex flex-col items-center">
          <FaEnvelope className="text-3xl text-green-500 mb-3" />
          <h2 className="text-2xl font-extrabold text-green-600 mb-2">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for? Reach out to our support team and we&apos;ll get back to you as soon as possible.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
