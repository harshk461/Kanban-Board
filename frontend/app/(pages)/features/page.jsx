// pages/features.jsx
import React from "react";
import { FaUsers, FaTasks, FaExchangeAlt, FaChartBar, FaMobileAlt, FaLock } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-4xl text-indigo-600" />,
    title: "Multi-Organization Support",
    description:
      "Effortlessly join, create, and switch between multiple organizations. Perfect for agencies, freelancers, and cross-functional teams.",
  },
  {
    icon: <FaTasks className="text-4xl text-green-500" />,
    title: "Customizable Trackers & Columns",
    description:
      "Set up your own trackers with custom columns for every workflow. Adapt KanbanPro to fit your unique process.",
  },
  {
    icon: <FaExchangeAlt className="text-4xl text-indigo-600" />,
    title: "Real-Time Collaboration",
    description:
      "See updates instantly as your team works. Move cards, assign tasks, and comment in real time.",
  },
  {
    icon: <FaChartBar className="text-4xl text-green-500" />,
    title: "Powerful Analytics",
    description:
      "Visualize progress and productivity with beautiful charts and actionable insights.",
  },
  {
    icon: <FaMobileAlt className="text-4xl text-indigo-600" />,
    title: "Mobile Friendly",
    description:
      "Manage your boards and tasks on any device. KanbanPro is fully responsive and touch-optimized.",
  },
  {
    icon: <FaLock className="text-4xl text-green-500" />,
    title: "Secure & Reliable",
    description:
      "Your data is protected with industry-standard encryption and secure authentication.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-16 px-4">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          Everything You Need for Team Productivity
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          KanbanPro brings powerful organization, real-time collaboration, and beautiful simplicity to your workflow.
        </p>
      </section>
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-200"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-base">{feature.description}</p>
          </div>
        ))}
      </section>
      <section className="max-w-2xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-extrabold text-green-600 mb-4">Ready to get started?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sign up for free and experience the power of KanbanPro for your next project or team.
        </p>
        <a
          href="/auth/signup"
          className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
        >
          Get Started Free
        </a>
      </section>
    </div>
  );
}
