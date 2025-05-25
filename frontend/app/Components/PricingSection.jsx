// components/PricingSection.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

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
    color: "from-indigo-100 to-white",
    button: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
  },
  {
    name: "Pro",
    price: "$9/mo",
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
    color: "from-indigo-500 to-green-400",
    button: "bg-gradient-to-r from-indigo-500 to-green-500 text-white hover:from-indigo-600 hover:to-green-600 shadow-lg",
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
    color: "from-green-100 to-white",
    button: "bg-green-100 text-green-700 hover:bg-green-200",
  },
];

export default function PricingSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-indigo-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your team. No hidden fees, cancel anytime.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
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
                {plan.price !== "Free" && (
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
      </div>
      {/* Decorative blob */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-100 rounded-full opacity-20 blur-2xl"></div>
    </section>
  );
}
