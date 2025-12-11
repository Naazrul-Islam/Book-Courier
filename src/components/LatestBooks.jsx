import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books/latest")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="latest-books">
      <h2 className="text-2xl font-bold mb-4">Latest Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {books.map(book => (
          <div key={book._id} className="border p-3 rounded shadow">
            <img src={book.coverImage} alt={book.title} className="w-full h-40 object-cover mb-2" />
            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
