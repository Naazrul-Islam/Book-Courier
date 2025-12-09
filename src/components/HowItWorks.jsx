import React from "react";
import { FaSearch, FaCartPlus, FaTruck } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch className="w-12 h-12 text-yellow-400" />,
    title: "Browse Books",
    description: "Explore thousands of books and pick your favorite.",
  },
  {
    id: 2,
    icon: <FaCartPlus className="w-12 h-12 text-pink-400" />,
    title: "Place Your Order",
    description: "Add books to your cart and checkout with secure payment.",
  },
  {
    id: 3,
    icon: <FaTruck className="w-12 h-12 text-cyan-400" />,
    title: "Fast Delivery",
    description: "Get your books delivered quickly to your doorstep.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/40 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg animate-bounce-slow">
          How It Works
        </h2>
        <p className="text-white/90 mb-16 text-lg md:text-xl">
          Ordering books from BookCourier is fun and colorful. Just 3 simple steps!
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl 
                transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:shadow-xl"
            >
              <div className="mb-5">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">{step.title}</h3>
              <p className="text-white/90 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
