import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Auth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user } = useContext(Auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/orders/user/${user?.email}`
      );
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  // Cancel order
  const cancelOrder = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (!confirmCancel) return;

    try {
      await axios.patch(`http://localhost:3000/orders/status/${id}`, {
        status: "cancelled",
      });

      // Update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Book Title</th>
              <th className="p-3">Order Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">{order.bookTitle}</td>

                <td className="p-3">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>

                <td className="p-3 capitalize">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      order.status === "pending"
                        ? "bg-yellow-600"
                        : order.status === "cancelled"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3 capitalize">
                  {order.paymentStatus}
                </td>

                <td className="p-3 space-x-3">
                  {/* CANCEL BUTTON */}
                  {order.status === "pending" && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}

                  {/* PAY NOW BUTTON */}
                  {order.status === "pending" &&
                    order.paymentStatus === "unpaid" && (
                      <Link to={`/payment/${order._id}`}>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                          Pay Now
                        </button>
                      </Link>
                    )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 text-lg"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
