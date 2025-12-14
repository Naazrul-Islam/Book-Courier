import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Auth } from "../auth/AuthContext";
import { FaTrash } from "react-icons/fa";

const MyWishlist = () => {
  const { user } = useContext(Auth);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/wishlist?email=${user.email}`)
        .then((res) => setWishlist(res.data));
    }
  }, [user]);

  const handleRemove = async (id) => {
    const confirm = window.confirm("Remove from wishlist?");
    if (!confirm) return;

    await axios.delete(`http://localhost:3000/wishlist/${id}`);
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📚 My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No wishlist items found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl shadow p-4 relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="font-bold mt-2">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.author}</p>
              <p className="font-semibold text-blue-600">
                ${item.price}
              </p>

              <button
                onClick={() => handleRemove(item._id)}
                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
