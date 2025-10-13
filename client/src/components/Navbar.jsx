import { useState, useEffect, useContext } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // You'll need to create this context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Option 1: Using a custom Auth Context (Recommended)
  // const { isLoggedIn, logout } = useAuth();

  // Option 2: Using local state with more frequent checks
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { getCartCount } = useCart();

  const navLinks = [
    { name: "Shop", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
  ];

  // Enhanced authentication check
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Check immediately
    checkAuthStatus();

    // Listen for storage changes (from other tabs)
    window.addEventListener("storage", checkAuthStatus);

    // Listen for custom auth events (from within same tab)
    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener("authChange", handleAuthChange);

    // Check on route changes (in case login happens and user navigates)
    checkAuthStatus();

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [location]); // Re-check when route changes

  // More frequent check using interval (fallback)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!!token !== isLoggedIn) {
        setIsLoggedIn(!!token);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authChange"));

    // If you're using a cart context, you might want to clear cart too
    // clearCart();

    navigate("/login");
  };

  // Debug: Log auth status to help troubleshooting
  useEffect(() => {
    console.log("Navbar auth status:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-gray-900 shadow-lg border-b border-gray-700">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-sm transform rotate-45"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
            </div>
            <span className="logo-name text-xl font-bold text-white tracking-tight">
              TECH<span className="text-blue-400">STORE</span>
            </span>
          </div>
        </Link>

        {/* Menu for large screens */}
        <ul className="hidden md:flex gap-12 font-medium">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.name}
              className="cursor-pointer"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link
                to={link.path}
                className="text-white hover:text-blue-400 transition-colors duration-200 font-semibold"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Auth Button - Fixed logic */}
          {isLoggedIn ? (
            <motion.button
              onClick={handleLogout}
              className="hidden md:inline-block px-5 py-2 border border-red-500 rounded-lg hover:bg-red-600 text-red-500 hover:text-white cursor-pointer transition-all duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          ) : (
            <>
              {/* Show both Login and Register when not logged in */}
              <Link to="/login">
                <motion.button
                  className="hidden md:inline-block px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-600 text-white cursor-pointer transition-all duration-200 font-medium mr-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  className="hidden md:inline-block px-5 py-2 bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600 text-white cursor-pointer transition-all duration-200 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </Link>
            </>
          )}

          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <motion.div
                className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"
                  />
                </svg>

                <motion.span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {getCartCount()}
                </motion.span>
              </motion.div>
            </Link>
          </div>

          {/* Burger menu button */}
          <motion.button
            className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Dropdown menu for small screens */}
      {isOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 w-full bg-gray-900 shadow-lg border-t border-gray-700 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center gap-4 font-medium py-6">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                className="cursor-pointer w-full text-center"
                whileHover={{ scale: 1.05, color: "#60a5fa" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  to={link.path}
                  className="block py-3 text-white hover:text-blue-400 transition-colors duration-200 font-semibold text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}

            {/* Mobile Auth Buttons */}
            <li className="w-full px-6 mt-4 space-y-3">
              {isLoggedIn ? (
                <motion.button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 border border-red-500 rounded-lg hover:bg-red-600 text-red-500 hover:text-white cursor-pointer transition-all duration-200 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Out
                </motion.button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.button
                      className="w-full py-3 border border-gray-500 rounded-lg hover:bg-gray-600 text-white cursor-pointer transition-all duration-200 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.button
                      className="w-full py-3 bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600 text-white cursor-pointer transition-all duration-200 font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Register
                    </motion.button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
