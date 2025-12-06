import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router';

const BannerSection = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://aggregate-amethyst-glspnldplv.edgeone.app/close-up-bottle-filled-coins.jpg"
          alt="coins background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-blue-800/70 to-purple-900/70"></div>
      </div>

      {/* Floating decorative shapes */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-32 right-20 w-60 h-60 bg-cyan-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"
      />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl mx-auto text-center p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold  leading-tight"
        >
          FinEase – <br />
          Simplify Your Finances, Empower Your Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className=" mt-6 text-lg md:text-xl"
        >
          Take control of your money, track your goals, and achieve financial freedom with ease.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/AddTransaction">
            <button className="flex items-center gap-3 bg-white text-indigo-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
              Get Started <FaArrowRight />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BannerSection;
