import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// ================= CHECKOUT FORM =================
const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const price = order?.price; // ✅ safe

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (!price) {
      alert("Price missing. Cannot proceed to payment.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create payment intent
      const { data } = await axios.post(
        "http://localhost:3000/create-payment-intent",
        { price }
      );

      const card = elements.getElement(CardElement);

      // 2️⃣ Confirm card payment
      const { paymentIntent, error } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: { card },
        });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // 3️⃣ Update order after success
      if (paymentIntent.status === "succeeded") {
        await axios.patch(
          `http://localhost:3000/orders/${order._id}`,
          {
            paymentStatus: "paid",
            transactionId: paymentIntent.id,
          }
        );

        navigate("/payment-success");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded-lg" />

      <button
        disabled={!stripe || loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

// ================= PAYMENT PAGE =================
const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/orders/${orderId}`)
      .then((res) => {
        console.log("ORDER 👉", res.data); // 🔎 debug
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Order not found");
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p>Loading...</p>;

  if (!order?.price) {
    return (
      <p className="text-red-600 text-center mt-10">
        ❌ Price missing. Cannot proceed to payment.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Pay for {order.bookName}
      </h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm order={order} />
      </Elements>
    </div>
  );
};

export default Payment;
