import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.cartItems || response.data);
      } catch (err) {
        console.error("Failed to load cart:", err);
        toast.error("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to place an order");
        navigate("/login");
        return;
      }

      // Prepare order data according to your backend schema
      const orderData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image_url: item.image_url,
        })),
      };

      // Send order to backend
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Show success message
      toast.success("Order placed successfully! 🎉");

      // Clear cart after successful order
      // await axios.delete("http://localhost:5000/api/cart/clear", {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      // Redirect to success page or home after delay
      setTimeout(() => {
        navigate("/order-success", {
          state: { order: response.data.order },
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to place order:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link to="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-blue-400 mb-8 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
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
              Add some items to your cart before proceeding to checkout.
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

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Updated Toaster with center position */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "white",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
        }}
      />

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
              Complete Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Order
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Enter your delivery information to complete the purchase
            </p>
          </motion.div>
        </div>
      </section>

      {/* Order Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/cart">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-blue-400 mb-8 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </motion.button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Delivery Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Delivery Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                        errors.fullName ? "border-red-500" : "border-gray-600"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                        errors.email ? "border-red-500" : "border-gray-600"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-300 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                        errors.phone ? "border-red-500" : "border-gray-600"
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-gray-300 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                        errors.address ? "border-red-500" : "border-gray-600"
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City, ZIP, Country */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.city ? "border-red-500" : "border-gray-600"
                        }`}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.zipCode ? "border-red-500" : "border-gray-600"
                        }`}
                        placeholder="12345"
                      />
                      {errors.zipCode && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                          errors.country ? "border-red-500" : "border-gray-600"
                        }`}
                        placeholder="Country"
                      />
                      {errors.country && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Place Order
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 pb-4 border-b border-gray-700 last:border-b-0"
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          ${parseFloat(item.price).toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-white font-semibold">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="space-y-3 border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (10%)</span>
                    <span>${(totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span>${(totalAmount * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
