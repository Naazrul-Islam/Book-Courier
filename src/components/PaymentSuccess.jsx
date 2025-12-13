import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
      >
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold mb-2">
          Payment Successful 🎉
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment has been completed successfully.  
          Thank you for your purchase!
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/my-orders")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
