import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Auth } from "../auth/AuthContext";
import Swal from "sweetalert2";

const statusFlow = {
  pending: "shipped",
  shipped: "delivered",
};

const LibrarianOrders = () => {
  const { user } = useContext(Auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for this librarian
  const fetchOrders = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(`http://localhost:3000/orders/librarian/${user.email}`);
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/orders/status/${orderId}`, { status: newStatus });
      Swal.fire("Success", `Order is now ${newStatus}`, "success");

      // Update local state instead of refetching
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // Cancel an order
  const cancelOrder = (order) => updateStatus(order._id, "cancelled");

  // Move status forward (pending → shipped → delivered)
  const moveStatusForward = (order) => {
    const nextStatus = statusFlow[order.status];
    if (nextStatus) updateStatus(order._id, nextStatus);
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
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">{order.bookTitle}</td>
                <td className="p-3">{order.buyerEmail}</td>
                <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>

                <td className="p-3">
                  {order.status === "cancelled" ? (
                    <span className="px-3 py-1 rounded bg-red-600 text-white">Cancelled</span>
                  ) : order.status === "delivered" ? (
                    <span className="px-3 py-1 rounded bg-green-600 text-white">Delivered</span>
                  ) : (
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="px-3 py-1 rounded bg-blue-100"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      {order.status === "shipped" && <option value="delivered">Delivered</option>}
                    </select>
                  )}
                </td>

                <td className="p-3">
                  {order.paymentStatus === "paid" ? (
                    <span className="px-3 py-1 rounded bg-green-600 text-white">Paid</span>
                  ) : (
                    <span className="px-3 py-1 rounded bg-red-600 text-white">Unpaid</span>
                  )}
                </td>

                <td className="p-3">
                  {order.status === "pending" && (
                    <button
                      onClick={() => cancelOrder(order)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianOrders;
