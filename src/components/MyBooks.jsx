import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Auth } from "../auth/AuthContext"; // assuming you have AuthContext

const MyBooks = () => {
  const { user } = useContext(Auth); // logged-in librarian
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    if (!user?.email) return;
    const res = await fetch(`http://localhost:3000/books/librarian/${user.email}`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book and all related orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#f87171",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3000/books/${id}?email=${user.email}`, {
        method: "DELETE",
      });
      Swal.fire("Deleted!", "Your book has been deleted.", "success");
      fetchBooks(); // refresh list
    }
  };

  const toggleStatus = async (book) => {
    const newStatus = book.status === "published" ? "unpublished" : "published";
    await fetch(`http://localhost:3000/books/${book._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, email: user.email }),
    });
    Swal.fire("Success!", `Book is now ${newStatus}`, "success");
    fetchBooks();
  };

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
              <tr key={book._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-lg shadow"
                  />
                </td>

                <td className="p-3 font-semibold">{book.title}</td>

                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(book)}
                    className={`px-3 py-1 rounded-lg font-bold ${
                      book.status === "published"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {book.status}
                  </button>
                </td>

                <td className="p-3 flex gap-2">
                  <Link to={`/dashboard/librarian/edit-book/${book._id}`}>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md">
                      Edit ✏️
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
                  >
                    Delete 🗑️
                  </button>
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

