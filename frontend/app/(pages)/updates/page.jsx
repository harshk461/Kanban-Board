// pages/updates.jsx
import React from "react";
import { FaGift, FaMagic, FaBug, FaLightbulb, FaBookOpen } from "react-icons/fa";

const updates = [
  {
    date: "2025-05-24",
    emoji: <FaGift className="text-indigo-500" />,
    type: "New Feature",
    title: "Share Button for Organizations",
    description: "You can now share your organizations with a unique link. Invite your teammates in one click!",
  },
  {
    date: "2025-05-20",
    emoji: <FaMagic className="text-green-500" />,
    type: "Improvement",
    title: "Custom Columns in Trackers",
    description: "Trackers now support fully customizable columns. Tailor your boards to your workflow.",
  },
  {
    date: "2025-05-15",
    emoji: <FaBug className="text-red-400" />,
    type: "Bug Fix",
    title: "Fixed Task Dragging Issue",
    description: "Resolved a bug where tasks wouldn’t always update position after a drag-and-drop.",
  },
  {
    date: "2025-05-10",
    emoji: <FaLightbulb className="text-yellow-400" />,
    type: "Tip",
    title: "Kanban Best Practice: Limit Work in Progress",
    description: "Keep your team focused by limiting the number of tasks in progress. This boosts flow and reduces bottlenecks.",
  },
];

const bestPractices = [
  "Create your sprint backlog during planning meetings.",
  "Encourage self-organizing teams and empower decision-making.",
  "Maintain charts (like burndown or velocity) to monitor progress.",
  "Hold sprint reviews and retrospectives to inspect and adapt.",
  "Limit work in progress on your Kanban board to keep teams focused.",
  "Regularly review your board and update tasks to reflect reality.",
  "Assign one responsible person per Kanban card for clarity.",
  "Keep your Kanban board visible and accessible to the whole team.",
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-16 px-4">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          What’s New & Best Practices
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Stay up to date with the latest product updates, productivity tips, and Agile/Kanban best practices.
        </p>
      </section>

      {/* Product Updates */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
          <FaGift className="text-xl" /> Recent Updates
        </h2>
        <ul className="space-y-6">
          {updates.map((u, idx) => (
            <li
              key={idx}
              className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-lg p-6 flex gap-4 items-start"
            >
              <div className="flex-shrink-0 mt-1">{u.emoji}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-400">{u.date}</span>
                  <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">
                    {u.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-indigo-700 mb-1">{u.title}</h3>
                <p className="text-gray-600">{u.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Best Practices */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          <FaBookOpen className="text-xl" /> Agile & Kanban Best Practices
        </h2>
        <ul className="list-disc pl-8 space-y-2 text-gray-700 text-base">
          {bestPractices.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </section>

      {/* Tips & Resources */}
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-green-600 mb-4">Want to learn more?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Check out our <a href="/help-center" className="text-indigo-600 underline hover:text-indigo-800">Help Center</a> for tutorials, documentation, and more productivity tips.
        </p>
      </section>
    </div>
  );
}
