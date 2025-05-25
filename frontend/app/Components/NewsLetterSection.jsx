// components/NewsletterSignup.jsx
import React, { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with your newsletter service
    setSubmitted(true);
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-indigo-50 via-white to-green-50">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-indigo-100 py-12 px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-3">
            Stay in the Loop
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for the latest updates, tips, and exclusive offers from KanbanPro.
          </p>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full sm:w-72 px-5 py-3 rounded-full border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg transition"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-green-600 font-semibold text-lg mt-4">
              Thank you for subscribing!
            </div>
          )}
        </div>
      </div>
      {/* Decorative blob */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-72 h-16 bg-green-100 rounded-full opacity-20 blur-2xl"></div>
    </section>
  );
}
