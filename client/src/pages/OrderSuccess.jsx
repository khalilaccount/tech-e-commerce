import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/products");
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Order Confirmed!
          </h1>

          <p className="text-gray-300 mb-2">
            Thank you for your purchase, <strong>{order.full_name}</strong>!
          </p>
          <p className="text-gray-400 mb-6">
            Your order has been placed successfully.
          </p>

          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-gray-300">
              Order ID: <span className="text-white font-mono">{order.id}</span>
            </p>
            <p className="text-gray-300">
              Total:{" "}
              <span className="text-white font-bold">
                ${parseFloat(order.total_amount).toFixed(2)}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </motion.button>
            </Link>

            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
