import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    author: "",
    price: "",
    status: "published",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.insertedId) {
      Swal.fire({
        title: "🎉 Book Added Successfully!",
        text: "Your book has been saved.",
        icon: "success",
        confirmButtonColor: "#6366f1",
      });

      e.target.reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-xl p-8 rounded-2xl backdrop-blur-xl bg-white/30 shadow-xl border border-white/40"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 drop-shadow-sm">
          📚 Add a New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Floating Input */}
          <div className="relative">
            <input
              type="text"
              name="title"
              required
              className="peer w-full p-3 bg-white/50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white/60 px-1 rounded">
              Book Name
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="image"
              required
              className="peer w-full p-3 bg-white/50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white/60 px-1 rounded">
              Book Image URL
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="author"
              required
              className="peer w-full p-3 bg-white/50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white/60 px-1 rounded">
              Author Name
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              name="price"
              required
              className="peer w-full p-3 bg-white/50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white/60 px-1 rounded">
              Price
            </label>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              name="status"
              className="w-full p-3 bg-white/50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>

            <label className="absolute left-3 -top-3 text-sm text-purple-600 bg-white/60 px-1 rounded">
              Status
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="category"
              className="peer w-full p-3 bg-white/50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white/60 px-1 rounded">
              Category
            </label>
          </div>

          <div className="relative">
            <textarea
              name="description"
              rows="3"
              className="peer w-full p-3 bg-white/50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            ></textarea>
            <label className="absolute left-3 top-3 text-gray-500 transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white/60 px-1 rounded">
              Description
            </label>
          </div>

          {/* Animated Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl shadow-lg font-semibold tracking-wide hover:shadow-2xl transition"
          >
            Add Book 🚀
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBook;
