import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navber from "../components/Navber";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <>
    <Navber></Navber>
    <div className="all-books py-10 px-5 bg-gray-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        📚 All Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <motion.div
            key={book._id}
            className="rounded-2xl overflow-hidden cursor-pointer relative shadow-lg"
            whileHover={{ scale: 1.07, rotate: 1, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 opacity-90 rounded-2xl"></div>

            {/* Book content */}
            <div className="relative p-4 flex flex-col justify-between h-60 text-white">
              <div>
                <h3 className="font-bold text-lg mb-1 hover:text-yellow-300 transition-colors duration-300">
                  {book.title}
                </h3>
                <p className="text-sm">{book.author}</p>
                <p className="text-xs mt-1">{book.genre || "Unknown Genre"}</p>
              </div>
              <button
                onClick={() => handleDetailsClick(book._id)}
                className="mt-3 w-full bg-white text-purple-700 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold"
              >
                Book Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AllBooks;
