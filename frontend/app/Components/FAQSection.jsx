// components/FAQSection.jsx
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Can I use KanbanPro for free?",
    answer:
      "Yes! Our Starter plan is free forever and lets you manage 1 organization and up to 2 trackers. Upgrade anytime for more features.",
  },
  {
    question: "How do I join multiple organizations?",
    answer:
      "With KanbanPro, you can join or create as many organizations as you need on the Pro plan. Easily switch between them from your dashboard.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and offer advanced security features for enterprise users, including SSO and custom SLAs.",
  },
  {
    question: "Can I cancel or change my plan anytime?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings. No hidden fees.",
  },
  {
    question: "Does KanbanPro support integrations?",
    answer:
      "Yes! Our Pro and Enterprise plans support popular integrations. Contact us for custom integration options.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-600 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Can’t find your answer? <a href="/contact" className="text-indigo-600 underline hover:text-indigo-800">Contact our team</a>.
        </p>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={faq.question}
              className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-2xl shadow-lg transition-all"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-lg md:text-xl font-semibold text-indigo-700">{faq.question}</span>
                <FaChevronDown
                  className={`ml-2 text-green-500 transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 pb-5 text-gray-600 text-base transition-all duration-300 ${
                  openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative blob */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-20 bg-green-100 rounded-full opacity-20 blur-2xl"></div>
    </section>
  );
}
