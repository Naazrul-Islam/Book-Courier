import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PaymentHistory = ({ user }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/payments/${user.email}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Payment fetch error:", err));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        💳 Your Payment History
      </h2>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4">Payment ID</th>
              <th className="p-4">Book</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, index) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-4 font-semibold text-gray-700">
                  {p.paymentId || "N/A"}
                </td>

                <td className="p-4 text-gray-600">
                  {p.bookName || "Unknown Book"}
                </td>

                <td className="p-4 font-bold text-green-700">
                  ${p.amount || 0}
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(p.orderDate).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  ❗ No payment records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
