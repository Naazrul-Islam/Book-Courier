import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navber from "./Navber";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Navber />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">All Books</h1>

        {loading ? (
          <p className="text-center py-10">Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold text-lg">{book.title}</h2>
                  <p className="text-gray-600">{book.author}</p>

                  <p className="font-semibold text-blue-600 mt-2">
                    ${book.price}
                  </p>

                  <p className="capitalize text-sm mt-1">
                    Category: {book.category}
                  </p>

                  <p
                    className={`text-xs mt-1 inline-block px-2 py-1 rounded text-white ${
                      book.status === "published"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {book.status}
                  </p>

                  {/* Book Details Button */}
                  <Link to={`/book/${book._id}`}>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                      Book Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
