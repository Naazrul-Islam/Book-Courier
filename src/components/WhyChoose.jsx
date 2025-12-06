import React from "react";
import { FaShippingFast, FaBookOpen, FaHeadset } from "react-icons/fa";

const reasons = [
  {
    id: 1,
    icon: <FaShippingFast className="text-purple-500 w-10 h-10" />,
    title: "Fast & Reliable Delivery",
    description:
      "Get your books delivered quickly and safely to your doorstep. We ensure timely delivery every time.",
  },
  {
    id: 2,
    icon: <FaBookOpen className="text-pink-500 w-10 h-10" />,
    title: "Wide Collection of Books",
    description:
      "Explore thousands of books across genres, carefully curated for readers of all ages.",
  },
  {
    id: 3,
    icon: <FaHeadset className="text-indigo-500 w-10 h-10" />,
    title: "24/7 Customer Support",
    description:
      "Our friendly support team is always available to assist you with orders, returns, and queries.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent 
          bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-move">
          Why Choose BookCourier
        </h2>
        <p className="text-gray-300 text-lg mb-16">
          Discover why thousands of book lovers trust BookCourier for their reading journey.
        </p>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {reasons.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 
                shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-5">{item.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
