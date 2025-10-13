// pages/VerifyResetCode.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowLeft, Shield, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const VerifyResetCode = () => {
  const [code, setCode] = useState(["", "", "", "", ""]); // 5-digit code
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // Redirect back if no email
      navigate("/request-reset");
    }
  }, [location, navigate]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 4) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== 5) {
      toast.error("Please enter the complete 5-digit code");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/verify-code", {
        email,
        code: verificationCode,
      });

      toast.success("Code verified successfully!");

      setTimeout(() => {
        navigate("/reset-password", {
          state: {
            email: email,
            code: verificationCode,
          },
        });
      }, 1500);
    } catch (error) {
      console.error("Verification error:", error);
      if (error.response?.status === 400) {
        toast.error("Invalid or expired verification code");
      } else {
        toast.error("Failed to verify code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/request-reset", {
        email,
      });
      toast.success("New code sent to your email!");
      // Clear the current code
      setCode(["", "", "", "", ""]);
      // Focus on first input
      document.getElementById("code-0").focus();
    } catch (error) {
      toast.error("Failed to resend code");
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
            Enter Verification{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Code
            </span>
          </h1>
          <p className="text-gray-300">We sent a 5-digit code to your email</p>
          <p className="text-blue-400 font-medium mt-2">{email}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Verify Code</h2>
              <p className="text-gray-400 mt-2">
                Enter the 5-digit code from your email
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl font-bold bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                ))}
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
                    Verifying...
                  </div>
                ) : (
                  "Verify Code"
                )}
              </motion.button>
            </form>

            <div className="text-center mt-6 space-y-4">
              <button
                onClick={handleResendCode}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
              >
                Didn't receive code? Resend
              </button>

              <div className="pt-4 border-t border-gray-700">
                <Link
                  to="/request-reset"
                  className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 text-sm transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Use different email
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyResetCode;
