import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Auth } from "../auth/AuthContext";
import { FaTimes, FaHeart } from "react-icons/fa";
import Navber from "./Navber";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(Auth);
  const navigate = useNavigate();

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch single book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  /* -------------------- ADD TO WISHLIST -------------------- */
  const handleAddToWishlist = async () => {
    if (!user) {
      alert("Please login to add wishlist");
      navigate("/login");
      return;
    }

    const wishlistData = {
      bookId: book._id,
      title: book.title,
      image: book.image,
      author: book.author,
      price: book.price,
      userEmail: user.email,
      addedAt: new Date(),
    };

    try {
      await axios.post("http://localhost:3000/wishlist", wishlistData);
      alert("Book added to wishlist ❤️");
    } catch (error) {
      console.error(error);
      alert("Already added or failed to add wishlist");
    }
  };

  /* -------------------- PLACE ORDER -------------------- */
  const handlePlaceOrder = async () => {
    if (!phone || !address) {
      alert("Please fill all fields");
      return;
    }

    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      price: Number(book.price),
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      phone,
      address,
      status: "pending",
      paymentStatus: "unpaid",
      orderDate: new Date(),
    };

    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:3000/orders", orderData);
      setSubmitting(false);
      setOpenModal(false);
      navigate(`/payment/${res.data.insertedId}`);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!book) return <p className="text-center py-10">Book not found.</p>;

  return (
    <>
      <Navber />
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <img src={book.image} alt={book.title} className="rounded-xl shadow" />

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-3">{book.title}</h1>
            <p className="mb-2"><b>Author:</b> {book.author}</p>
            <p className="mb-2"><b>Category:</b> {book.category}</p>
            <p className="text-xl font-semibold text-blue-600 mb-4">
              Price: ${book.price}
            </p>

            <p className="text-gray-700 mb-6">{book.description}</p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setOpenModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Order Now
              </button>

              <button
                onClick={handleAddToWishlist}
                className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 flex items-center gap-2"
              >
                <FaHeart /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- ORDER MODAL ---------------- */}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3"
              >
                <FaTimes />
              </button>

              <h2 className="text-2xl font-bold mb-4">Place Order</h2>

              <input value={user?.displayName} readOnly className="input" />
              <input value={user?.email} readOnly className="input" />

              <input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input"
              />

              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input"
              />

              <button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-2 rounded mt-4"
              >
                {submitting ? "Placing..." : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetails;
