// pages/RequestReset.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Shield } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Before axios");
      await axios.post("http://localhost:5000/api/auth/request-reset", {
        email,
      });
      console.log("After axios");

      toast.success("If the email exists, a reset code has been sent!");

      // Navigate to verify code page with just the email
      setTimeout(() => {
        navigate("/verify-code", {
          state: {
            email: email,
          },
        });
      }, 2000);
    } catch (error) {
      console.error("Reset request error:", error);
      if (error.response?.status === 404) {
        // Still show success message for security (don't reveal if email exists)
        toast.success("If the email exists, a reset code has been sent!");
        setTimeout(() => {
          navigate("/verify-code", {
            state: { email: email },
          });
        }, 2000);
      } else {
        toast.error("Failed to send reset code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" />

      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 justify-center mb-6"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white rounded-sm transform rotate-45"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                TECH<span className="text-blue-400">STORE</span>
              </span>
            </motion.div>
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Reset Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Password
            </span>
          </h1>
          <p className="text-gray-300">
            Enter your email address and we'll send you a verification code
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Password Reset</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25"
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Code...
                  </div>
                ) : (
                  "Send Verification Code"
                )}
              </motion.button>
            </form>

            <div className="text-center mt-6 space-y-4">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestReset;
