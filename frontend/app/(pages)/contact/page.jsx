'use client'

import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with your backend or email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-16 px-4">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          Contact & Support
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Need help or want to get in touch? Fill out the form below and our team will respond as soon as possible.
        </p>
      </section>

      {/* Contact Form */}
      <section className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaCheckCircle className="text-4xl text-green-500 mb-3" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Thank you!</h2>
            <p className="text-gray-600">
              Your message has been sent. We&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                placeholder="How can we help you?"
                rows={5}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
            >
              Send Message
            </button>
          </form>
        )}
      </section>

      {/* Alternative Contact Info */}
      <section className="max-w-xl mx-auto mt-10 text-center">
        <div className="flex items-center justify-center gap-6 text-indigo-600 text-lg mb-2">
          <FaEnvelope className="text-xl" />
          <span>support@kanbanpro.com</span>
        </div>
        <div className="flex items-center justify-center gap-6 text-green-600 text-lg">
          <FaPhone className="text-xl" />
          <span>+1 (555) 123-4567</span>
        </div>
      </section>
    </div>
  );
}
