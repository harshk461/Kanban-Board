// pages/about.jsx
import React from "react";

const team = [
  {
    name: "Aarav Mehta",
    role: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Aarav is passionate about building tools that empower teams to do their best work. He leads KanbanPro’s vision and strategy.",
  },
  {
    name: "Priya Sharma",
    role: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Priya crafts robust, scalable solutions and ensures KanbanPro is fast, secure, and delightful to use.",
  },
  {
    name: "Michael Chen",
    role: "Product Designer",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "Michael brings simplicity and beauty to every pixel, making sure KanbanPro is intuitive for everyone.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-16 px-4">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          About KanbanPro
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Our mission is to help teams everywhere organize, collaborate, and achieve more—beautifully and simply.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg">
            KanbanPro was born from our own need for a flexible, real-time, and visually appealing way to manage projects across multiple organizations. We believe that productivity tools should be powerful yet delightful, and that every team—no matter the size—deserves clarity, transparency, and flow.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full border-4 border-green-300 mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-indigo-700">{member.name}</h3>
              <span className="text-green-600 font-medium mb-2">{member.role}</span>
              <p className="text-gray-600 text-base">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-green-600 mb-4">Join Us on Our Journey</h2>
        <p className="text-lg text-gray-600 mb-8">
          Whether you’re a team of 2 or 2000, KanbanPro is here to help you organize, collaborate, and grow.
        </p>
        <a
          href="/signup"
          className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
        >
          Get Started Free
        </a>
      </section>
    </div>
  );
}
