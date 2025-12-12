import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/books/latest")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="all-books py-10 px-5 bg-gray-50 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        📚 All Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <motion.div
            key={book._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.07, rotate: 1, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-60 object-cover hover:brightness-90 transition duration-300"
            />
            <div className="p-4 flex flex-col justify-between h-40">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-1 hover:text-indigo-600 transition-colors duration-300">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-xs text-gray-400 mt-1">{book.genre || "Unknown Genre"}</p>
              </div>
              <button
                onClick={() => handleDetailsClick(book._id)}
                className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold"
              >
                Book Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
