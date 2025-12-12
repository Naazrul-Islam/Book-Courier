import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams(); // get book id from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single book
  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/books/${id}`);
      setBook(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!book) return <p className="text-center py-10">Book not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Book Image */}
        <div>
          <img
            src={book.image}
            alt={book.title}
            className="w-full rounded-xl shadow"
          />
        </div>

        {/* Book Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{book.title}</h1>

          <p className="text-lg mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>

          <p className="text-lg mb-2 capitalize">
            <span className="font-semibold">Category:</span> {book.category}
          </p>

          <p className="text-lg mb-2 capitalize">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded text-white ${
                book.status === "published" ? "bg-green-600" : "bg-yellow-500"
              }`}
            >
              {book.status}
            </span>
          </p>

          <p className="text-xl font-semibold mb-4 text-blue-600">
            Price: ${book.price}
          </p>

          <p className="text-gray-700 leading-relaxed">{book.description}</p>

          {/* Add extra actions here */}
          {/* Example: Borrow / Add to Cart / Wishlist */}
          <div className="mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Borrow Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
