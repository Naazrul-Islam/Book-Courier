import React, { useEffect, useState, useContext } from "react";
import { Auth } from "../auth/AuthContext"; // Assuming you have AuthContext
import axios from "axios";
import { toast } from "react-toastify";

const LibrarianOrders = () => {
  const { user } = useContext(Auth); // Logged-in librarian
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders added by this librarian
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/orders?addedBy=${user.uid}`);
      setOrders(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  // Cancel an order
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(`/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      toast.success("Order canceled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel order");
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Book Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Book Name</th>
              <th className="p-2 border">Ordered By</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="text-center">
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">{order.bookName}</td>
                <td className="p-2 border">{order.userName}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LibrarianOrders;
