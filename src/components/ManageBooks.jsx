import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);

  // Fetch books from server
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Publish / Unpublish
  const togglePublish = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "published" ? "unpublished" : "published";
      await axios.patch(`http://localhost:3000/books/${id}/publish`, { publish: newStatus });
      toast.success(`Book ${newStatus}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Delete Book
  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    }
  };

  // Edit Book
  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/books/${editingBook._id}`, editingBook);
      toast.success("Book updated successfully");
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update book");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Books</h2>

      <table className="table-auto w-full border mb-4">
        <thead>
          <tr>
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Author</th>
            <th className="border px-2 py-1">Added By</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border">
              <td className="border px-2 py-1">{book.title}</td>
              <td className="border px-2 py-1">{book.author}</td>
              <td className="border px-2 py-1">{book.addedBy || "-"}</td>
              <td className="border px-2 py-1">
                {book.status === "published" ? "Published" : "Unpublished"}
              </td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => togglePublish(book._id, book.status)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                >
                  {book.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => deleteBook(book._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingBook && (
        <form
          onSubmit={handleUpdate}
          className="p-4 border rounded bg-gray-50 max-w-md"
        >
          <h3 className="text-lg font-bold mb-2">Edit Book</h3>
          <input
            type="text"
            value={editingBook.title}
            onChange={(e) =>
              setEditingBook({ ...editingBook, title: e.target.value })
            }
            placeholder="Title"
            className="border p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            value={editingBook.author}
            onChange={(e) =>
              setEditingBook({ ...editingBook, author: e.target.value })
            }
            placeholder="Author"
            className="border p-2 mb-2 w-full"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Book
            </button>
            <button
              type="button"
              onClick={() => setEditingBook(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManageBooks;

