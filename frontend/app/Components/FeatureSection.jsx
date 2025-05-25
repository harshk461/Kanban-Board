// components/FeaturesSection.jsx
import React from "react";
import { FaUsers, FaTasks, FaExchangeAlt, FaChartBar } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-3xl text-indigo-600" />,
    title: "Multi-Org Collaboration",
    description:
      "Join and manage multiple organizations seamlessly. Switch between workspaces with a single click.",
  },
  {
    icon: <FaTasks className="text-3xl text-green-500" />,
    title: "Flexible Trackers",
    description:
      "Create, join, and organize multiple trackers for tasks, projects, or teams. Stay on top of every workflow.",
  },
  {
    icon: <FaExchangeAlt className="text-3xl text-indigo-600" />,
    title: "Real-Time Sync",
    description:
      "Instantly see updates from your team. Drag, drop, and update cards with real-time collaboration.",
  },
  {
    icon: <FaChartBar className="text-3xl text-green-500" />,
    title: "Progress Insights",
    description:
      "Visualize your productivity and team progress with beautiful, actionable analytics.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-indigo-50 to-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-4">
          Why KanbanPro?
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover the features that make KanbanPro the ultimate tool for modern teams and organizations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="flex items-start gap-5 bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-200"
            >
              <div className="flex-shrink-0 bg-indigo-50 rounded-full p-4 shadow">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative blob */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-green-100 rounded-full opacity-30 blur-2xl"></div>
    </section>
  );
}
