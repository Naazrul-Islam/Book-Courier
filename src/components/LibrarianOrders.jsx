import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "../auth/AuthContext";

const LibrarianOrders = () => {
  const { user } = useContext(Auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/orders/librarian/${user.email}`)
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  // Cancel order
  const cancelOrder = async (id) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      await axios.patch(`http://localhost:3000/orders/status/${id}`, {
        status: "cancelled",
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: "cancelled" } : o
        )
      );
    } catch {
      alert("Failed to cancel order");
    }
  };

  // Change status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/orders/status/${id}`, {
        status,
      });

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Book Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Book</th>
              <th className="p-3">Buyer</th>
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
                <td className="p-3">{order.buyerEmail}</td>

                <td className="p-3">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>

                {/* STATUS DROPDOWN */}
                <td className="p-3">
                  {order.status !== "cancelled" ? (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  ) : (
                    <span className="px-3 py-1 rounded bg-red-600 text-white">
                      Cancelled
                    </span>
                  )}
                </td>

                {/* PAYMENT */}
                <td className="p-3">
                  {order.paymentStatus === "paid" ? (
                    <span className="px-3 py-1 rounded bg-green-600 text-white">
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded bg-red-600 text-white">
                      Unpaid
                    </span>
                  )}
                </td>

                {/* ACTION */}
                <td className="p-3">
                  {order.status === "pending" && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianOrders;
