import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Auth } from "../auth/AuthContext";


const AddBook = () => {
  const { user } = useContext(Auth);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire("Error", "User not logged in", "error");
      return;
    }

    const bookData = {
      ...formData,
      addedBy: user.email, // 🔥 KEY FIX
    };

    try {
      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          title: "🎉 Book Added Successfully!",
          text: "Your book has been saved.",
          icon: "success",
          confirmButtonColor: "#6366f1",
        });

        setFormData({
          title: "",
          image: "",
          author: "",
          price: "",
          status: "published",
          category: "",
          description: "",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add book", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl p-8 rounded-2xl backdrop-blur-xl bg-white/30 shadow-xl border border-white/40"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📚 Add a New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: "title", label: "Book Name" },
            { name: "image", label: "Book Image URL" },
            { name: "author", label: "Author Name" },
            { name: "price", label: "Price", type: "number" },
            { name: "category", label: "Category" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name} className="relative">
              <input
                type={type}
                name={name}
                value={formData[name]}
                required
                onChange={handleChange}
                className="peer w-full p-3 bg-white/50 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label className="absolute left-3 top-3 text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white/60 px-1 rounded">
                {label}
              </label>
            </div>
          ))}

          {/* Status */}
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 bg-white/50 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
            <label className="absolute left-3 -top-3 text-sm text-purple-600 bg-white/60 px-1 rounded">
              Status
            </label>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="peer w-full p-3 bg-white/50 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            />
            <label className="absolute left-3 top-3 text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600 bg-white/60 px-1 rounded">
              Description
            </label>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl shadow-lg font-semibold"
          >
            Add Book 🚀
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBook;
