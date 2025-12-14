import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PaymentHistory = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/payments/${user.email}`)
      .then((res) => {
        setPayments(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return <p className="text-center mt-20">Loading payments...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        💳 Payment History
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Amount</th>
              <th>Transaction</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, index) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td>{index + 1}</td>
                <td>{p.bookTitle}</td> {/* ✅ FIXED */}
                <td className="text-green-600 font-semibold">
                  ${p.price}
                </td>
                <td className="text-sm">{p.transactionId}</td>
                <td>
                  {new Date(p.paidAt).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No payment history found
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
