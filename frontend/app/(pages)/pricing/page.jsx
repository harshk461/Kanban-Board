// pages/pricing.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

// Pricing plans data
const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals and small teams starting out.",
    features: [
      "1 Organization",
      "Up to 2 Trackers",
      "Basic Analytics",
      "Community Support",
    ],
    cta: "Get Started",
    highlight: false,
    button: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
  },
  {
    name: "Pro",
    price: "$9",
    description: "For growing teams managing multiple projects.",
    features: [
      "Unlimited Organizations",
      "Unlimited Trackers",
      "Advanced Analytics",
      "Priority Support",
      "Team Collaboration",
    ],
    cta: "Start Pro",
    highlight: true,
    button:
      "bg-gradient-to-r from-indigo-500 to-green-500 text-white hover:from-indigo-600 hover:to-green-600 shadow-lg",
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "Custom solutions for large organizations and enterprises.",
    features: [
      "All Pro Features",
      "Custom Integrations",
      "Dedicated Manager",
      "SSO & Security Suite",
      "Custom SLAs",
    ],
    cta: "Contact Sales",
    highlight: false,
    button: "bg-green-100 text-green-700 hover:bg-green-200",
  },
];

// FAQ data
const faqs = [
  {
    question: "Can I use KanbanPro for free?",
    answer:
      "Yes! The Starter plan is free forever and lets you manage 1 organization and up to 2 trackers. Upgrade anytime for more features.",
  },
  {
    question: "Can I change or cancel my plan?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time from your account settings.",
  },
  {
    question: "Do you offer discounts for non-profits or education?",
    answer:
      "Yes! Contact our team for special pricing for non-profits, educational institutions, or large teams.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. We use industry-standard encryption and trusted payment processors to keep your data safe.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the plan that fits your team. No hidden fees, cancel anytime.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col items-center bg-white/80 backdrop-blur-lg border ${
                plan.highlight
                  ? "border-4 border-green-400 scale-105 shadow-2xl z-10"
                  : "border-indigo-100 shadow-lg"
              } rounded-3xl p-8 transition-transform duration-200 hover:scale-105`}
            >
              {plan.highlight && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}
              <h3
                className={`text-2xl font-bold mb-2 ${
                  plan.highlight ? "text-green-600" : "text-indigo-700"
                }`}
              >
                {plan.name}
              </h3>
              <div className="text-4xl font-extrabold mb-2">
                {plan.price}
                {plan.price === "$9" && (
                  <span className="text-base font-normal text-gray-500">/month</span>
                )}
              </div>
              <p className="text-gray-600 mb-6 text-center">{plan.description}</p>
              <ul className="mb-8 w-full">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-700 mb-2">
                    <FaCheckCircle
                      className={`${
                        plan.highlight ? "text-green-500" : "text-indigo-400"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-bold text-lg transition-all duration-200 ${plan.button}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-green-50 via-white to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={faq.question}
                className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-2xl shadow-lg transition-all px-6 py-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-semibold text-indigo-700">{faq.question}</span>
                </div>
                <div className="mt-2 text-gray-600 text-base">{faq.answer}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
