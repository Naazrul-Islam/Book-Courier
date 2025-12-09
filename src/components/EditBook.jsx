import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "Updated Successfully!",
        text: "Your book information has been saved.",
        icon: "success",
        confirmButtonColor: "#6366f1",
      });
    }
  };

  if (!book) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/30 backdrop-blur-lg border border-white/40 p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 drop-shadow-sm">
          ✏️ Edit Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Floating Inputs */}
          {[
            { label: "Book Name", name: "title", type: "text" },
            { label: "Book Image URL", name: "image", type: "text" },
            { label: "Author", name: "author", type: "text" },
            { label: "Price", name: "price", type: "number" },
          ].map((field, idx) => (
            <div className="relative" key={idx}>
              <input
                type={field.type}
                name={field.name}
                value={book[field.name]}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full p-3 rounded-xl bg-white/60 border border-gray-300 
                           text-gray-800 outline-none 
                           focus:ring-2 focus:ring-purple-500"
              />

              <label
                className="absolute left-3 top-3 px-1 rounded bg-white/60 text-gray-600
                           transition-all duration-200 
                           peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600
                           peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600"
              >
                {field.label}
              </label>
            </div>
          ))}

          {/* Status Select */}
          <div className="relative">
            <select
              name="status"
              value={book.status}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 border border-gray-300 
                         text-gray-800 outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>

            <label
              className="absolute -top-3 left-3 text-sm px-1 bg-white/60 text-purple-600"
            >
              Status
            </label>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder=" "
              rows="3"
              className="peer w-full p-3 rounded-xl bg-white/60 border border-gray-300 
                         text-gray-800 outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>

            <label
              className="absolute left-3 top-3 px-1 rounded bg-white/60 text-gray-600
                         transition-all duration-200
                         peer-focus:-top-3 peer-focus:text-sm peer-focus:text-purple-600
                         peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600"
            >
              Description
            </label>
          </div>

          {/* Update Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                       text-white font-semibold rounded-xl shadow-lg"
          >
            Update Book ✔️
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditBook;
