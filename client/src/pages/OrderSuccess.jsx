// OrderSuccess.js
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const { order, cartCleared } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>

          {cartCleared && (
            <p className="text-green-400 mb-6">
              Your cart has been cleared automatically.
            </p>
          )}

          {/* Order Details */}
          {order && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-md mx-auto mb-8"
            >
              <h3 className="text-white font-semibold mb-4">Order Summary</h3>
              <div className="text-left space-y-2 text-gray-300">
                <p>Order #: {order.id}</p>
                <p>Total: ${order.total_amount}</p>
                <p>Status: {order.status || "Confirmed"}</p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>

            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 border border-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
