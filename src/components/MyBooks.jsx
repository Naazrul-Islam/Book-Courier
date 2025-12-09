import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const MyBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books") // this route returns ALL books
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 My Books</h1>

      <div className="overflow-x-auto shadow-xl rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Book Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="border-b hover:bg-gray-100 transition"
              >
                {/* Image */}
                <td className="p-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-lg shadow"
                  />
                </td>

                {/* Title */}
                <td className="p-3 font-semibold">{book.title}</td>

                {/* Status */}
                <td className="p-3">
                  {book.status === "published" ? (
                    <span className="text-green-600 font-bold">Published</span>
                  ) : (
                    <span className="text-red-600 font-bold">Unpublished</span>
                  )}
                </td>

                {/* Edit Button */}
                <td className="p-3">
                  <Link to={`/dashboard/librarian/edit-book/${book._id}`}>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md">
                      Edit ✏️
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;
