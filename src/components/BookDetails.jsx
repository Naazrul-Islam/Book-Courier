import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Auth } from "../auth/AuthContext"; // logged-in user context
import { FaTimes } from "react-icons/fa";
import Navber from "./Navber";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = React.useContext(Auth); // logged-in user
  const navigate = useNavigate();

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  // Handle Order Submission
  const handlePlaceOrder = async () => {
    if (!phone || !address) {
      alert("Please fill all fields");
      return;
    }

    if (!book?.price) {
      alert("Book price is missing. Cannot place order.");
      return;
    }

    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      price: Number(book.price), // 🔥 IMPORTANT: Add price here
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

      alert("Order placed successfully!");

      // Redirect to payment page
      navigate(`/payment/${res.data.insertedId}`);

      setPhone("");
      setAddress("");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert("Failed to place order.");
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
          <div>
            <img
              src={book.image}
              alt={book.title}
              className="w-full rounded-xl shadow"
            />
          </div>

          {/* Info */}
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

            {/* Order Button */}
            <div className="mt-6">
              <button
                onClick={() => setOpenModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------- ORDER MODAL ---------------------- */}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative">
              {/* Close button */}
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              >
                <FaTimes size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-4">Place Order</h2>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="font-semibold">Name</label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label className="font-semibold">Email</label>
                  <input
                    type="text"
                    value={user?.email}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>

                <div>
                  <label className="font-semibold">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold">Address</label>
                  <textarea
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded"
                  ></textarea>
                </div>

                {/* Place Order */}
                <button
                  disabled={submitting}
                  onClick={handlePlaceOrder}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {submitting ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetails;
