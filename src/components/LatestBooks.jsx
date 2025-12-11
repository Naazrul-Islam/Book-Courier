import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books/latest")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="latest-books py-10 px-5 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        📚 Latest Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <motion.div
            key={book._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-1 hover:text-indigo-600 transition-colors duration-300">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
