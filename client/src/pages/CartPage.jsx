import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const [updating, setUpdating] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {
    cartItems,
    loading,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    refreshCart,
  } = useCart();

  useEffect(() => {
    // The cart context automatically fetches cart items on mount
    // We just need to ensure we have a token
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleRemoveFromCart = async (itemId) => {
    const success = await removeFromCart(itemId);
    if (!success) {
      alert("Failed to remove item from cart");
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your entire cart?")) {
      return;
    }

    const success = await clearCart();
    if (!success) {
      alert("Failed to clear cart");
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(itemId);
      return;
    }

    setUpdating(itemId);
    console.log(
      `🔄 Updating quantity: itemId=${itemId}, newQuantity=${newQuantity}`
    );

    try {
      const success = await updateQuantity(itemId, newQuantity);

      if (!success) {
        console.error("❌ updateQuantity returned false");
        alert("Failed to update quantity");
      } else {
        console.log("✅ Quantity updated successfully");
      }
    } catch (error) {
      console.error("❌ Error in handleUpdateQuantity:", error);
      alert("Failed to update quantity");
    } finally {
      setUpdating(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading cart...</p>
        </div>
      </div>
    );
  }

  // Authentication check
  if (!token) {
    navigate("/login");
    return null;
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-blue-400 mb-8 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </motion.button>
          </Link>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-400 mb-6">
              Start shopping to add some amazing tech products!
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Browse Products
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-12 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Shopping Cart
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Review your items and proceed to checkout
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.item_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <Link
                          to={`/products/${item.item_id}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-32 h-32 object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1">
                          <Link to={`/products/${item.item_id}`}>
                            <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer">
                              {item.name}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-2xl font-bold text-blue-400">
                              ${parseFloat(item.price).toFixed(2)}
                            </span>
                            <span className="text-gray-400">each</span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <span className="text-gray-300">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.item_id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={updating === item.item_id}
                                className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {updating === item.item_id ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  "-"
                                )}
                              </button>
                              <span className="w-8 text-center text-white font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.item_id,
                                    item.quantity + 1
                                  )
                                }
                                disabled={updating === item.item_id}
                                className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {updating === item.item_id ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  "+"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end justify-between">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white mb-2">
                              $
                              {(parseFloat(item.price) * item.quantity).toFixed(
                                2
                              )}
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.item_id)}
                              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-800 rounded-2xl border border-gray-700 p-6 sticky top-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${(totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span>${(totalAmount * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link to="/order">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border border-gray-600 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-gray-700 transition-all duration-300"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>

                {/* Clear All Button */}
                <motion.button
                  onClick={handleClearCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-red-600 text-red-400 py-3 rounded-xl font-semibold mt-4 hover:bg-red-900/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Entire Cart
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
