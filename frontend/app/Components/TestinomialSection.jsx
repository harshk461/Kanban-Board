// components/TestimonialsSection.jsx
import React from "react";

const testimonials = [
  {
    name: "Alex Johnson",
    org: "Product Lead, TechNova",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "KanbanPro transformed how our teams collaborate across departments. The multi-org support is a game changer!",
  },
  {
    name: "Priya Sharma",
    org: "Project Manager, GreenLeaf",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I love how easy it is to switch between trackers and organizations. The interface is beautiful and intuitive.",
  },
  {
    name: "Michael Chen",
    org: "CTO, BuildSmart",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "Real-time updates and analytics keep our remote teams aligned and productive. Highly recommended!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-4">
          What Our Users Say
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Teams and organizations around the world trust KanbanPro to streamline their workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-200"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full border-4 border-green-300 shadow mb-4"
              />
              <p className="text-lg text-gray-700 italic mb-4">&quot;{t.text}&quot;</p>
              <div className="text-center">
                <span className="font-bold text-green-700">{t.name}</span>
                <br />
                <span className="text-sm text-gray-500">{t.org}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative blob */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-20 bg-indigo-100 rounded-full opacity-30 blur-2xl"></div>
    </section>
  );
}
