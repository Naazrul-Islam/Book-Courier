import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PaymentHistory = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axios
      .get(`http://localhost:3000/payments/${user.email}`)
      .then((res) => {
        setPayments(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Payment fetch error:", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <p className="text-center mt-16 text-gray-600">
        Loading invoices...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📄 Invoices
      </h2>

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4">Payment ID</th>
              <th className="p-4">Book Name</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Paid Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, index) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-4 font-medium text-gray-700">
                  {p.transactionId || "N/A"}
                </td>

                <td className="p-4 text-gray-600">
                  {p.bookName || "Unknown Book"}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  ${Number(p.price || 0).toFixed(2)}
                </td>

                <td className="p-4 text-gray-500">
                  {p.paidAt
                    ? new Date(p.paidAt).toLocaleDateString()
                    : p.orderDate
                    ? new Date(p.orderDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </motion.tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-8 text-center text-gray-500"
                >
                  ❗ No invoices found
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
