import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navber from "./Navber";
import axios from "axios";
import Footer from "./Footer";
import { motion } from "framer-motion";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books");
        setBooks(res.data || []);
        setFilteredBooks(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // 🔍 Search & Sort
  useEffect(() => {
    let updated = [...books];

    if (search.trim()) {
      updated = updated.filter((b) =>
        (b?.title || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "lowToHigh") {
      updated.sort((a, b) => Number(a?.price || 0) - Number(b?.price || 0));
    } else if (sort === "highToLow") {
      updated.sort((a, b) => Number(b?.price || 0) - Number(a?.price || 0));
    }

    setFilteredBooks(updated);
  }, [search, sort, books]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navber />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center mb-10 text-gray-800"
        >
          📚 Explore All Books
        </motion.h1>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
          <input
            type="text"
            placeholder="🔍 Search by book name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-5 py-3 rounded-xl border bg-white/70 backdrop-blur focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/4 px-5 py-3 rounded-xl border bg-white/70 backdrop-blur focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          >
            <option value="">Sort by price</option>
            <option value="lowToHigh">Price: Low → High</option>
            <option value="highToLow">Price: High → Low</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-lg py-20 text-gray-500">
            Loading books...
          </p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-center text-lg py-20 text-gray-500">
            😔 No books found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <motion.div
                key={book._id}
                whileHover={{ y: -6 }}
                className="bg-white/80 backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border"
              >
                <div className="relative">
                  <img
                    src={book?.image || "https://via.placeholder.com/300"}
                    alt={book?.title}
                    className="h-52 w-full object-cover"
                  />
                  <span
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white ${
                      book?.status === "published"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {book?.status || "unknown"}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="font-bold text-lg text-gray-800 truncate">
                    {book?.title || "Untitled Book"}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {book?.author || "Unknown Author"}
                  </p>

                  <p className="text-blue-600 font-semibold mt-3 text-lg">
                    ${book?.price || 0}
                  </p>

                  <p className="text-xs mt-1 text-gray-500 capitalize">
                    {book?.category || "N/A"}
                  </p>

                  <Link to={`/books/${book._id}`}>
                    <button className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition">
                      View Details →
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllBooks;
