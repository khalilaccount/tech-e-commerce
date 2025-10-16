import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Search,
  Star,
  ShoppingCart,
  Eye,
  Package,
  Filter,
  X,
} from "lucide-react"; // Added Filter and X icons
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRating } from "../context/RatingContext";
import { useCart } from "../context/CartContext";
import { toast, Toaster } from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { ratings, userRatings, submitRating } = useRating();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Filter states
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 10000,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("Starting to fetch products...");

        const response = await axios.get("http://localhost:5000/api/products");
        console.log("API Response:", response);
        console.log("Response data:", response.data);
        console.log("Response status:", response.status);

        if (!response.data) {
          console.error("No data received from API");
          setLoading(false);
          return;
        }

        const productsData = response.data;
        console.log("Products data:", productsData);

        // Check if productsData is an array
        if (!Array.isArray(productsData)) {
          console.error("Products data is not an array:", typeof productsData);
          setLoading(false);
          return;
        }

        setProducts(productsData);
        setFilteredProducts(productsData);

        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category)),
        ].filter(Boolean);
        console.log("Unique categories:", uniqueCategories);
        setCategories(uniqueCategories);

        // Calculate price range from actual products
        if (productsData.length > 0) {
          const prices = productsData.map((p) => p.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          console.log("Price range:", minPrice, maxPrice);
          setPriceRange({
            min: minPrice,
            max: maxPrice,
          });
        } else {
          console.log("No products found in response");
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch latest products:", err);
        console.error("Error details:", err.response?.data || err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters whenever search term, category, or price range changes
  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedCategory, priceRange]);

  const getStockStatus = (quantity) => {
    if (quantity === 0) {
      return {
        text: "Out of Stock",
        bgColor: "bg-red-500",
        textColor: "text-red-500",
      };
    } else if (quantity < 5) {
      return {
        text: "Low Stock",
        bgColor: "bg-orange-500",
        textColor: "text-orange-500",
      };
    } else {
      return {
        text: "In Stock",
        bgColor: "bg-green-500",
        textColor: "text-green-500",
      };
    }
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add items to cart");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }

    if (product.quantity === 0) {
      toast.error("This product is out of stock");
      return;
    }

    try {
      const success = await addToCart(product);
      if (success) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange({
      min: 0,
      max: 10000,
    });
    setSearchTerm("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (priceRange.min > 0 || priceRange.max < 10000) count++;
    return count;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-center" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Products
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our complete collection of cutting-edge technology and
              premium gadgets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Left: Search and Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Filter Toggle Button - Mobile & Desktop */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-all duration-200"
              >
                <Filter className="w-5 h-5" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Right: Results Count and Clear Filters */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
              <div className="text-gray-300">
                Showing {filteredProducts.length} of {products.length} products
              </div>

              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 bg-gray-700 rounded-lg border border-gray-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        selectedCategory === "all"
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500"
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                          selectedCategory === category
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Price Range: ${priceRange.min} - ${priceRange.max}
                  </label>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-gray-400 text-sm mb-1">
                          Min Price
                        </label>
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              min: Math.max(0, parseInt(e.target.value) || 0),
                            }))
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-gray-400 text-sm mb-1">
                          Max Price
                        </label>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              max: Math.max(
                                priceRange.min,
                                parseInt(e.target.value) || 10000
                              ),
                            }))
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Price Range Slider */}
                    <div className="pt-2">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange((prev) => ({
                            ...prev,
                            max: parseInt(e.target.value),
                          }))
                        }
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <style jsx>{`
                        .slider::-webkit-slider-thumb {
                          appearance: none;
                          height: 20px;
                          width: 20px;
                          border-radius: 50%;
                          background: #3b82f6;
                          cursor: pointer;
                        }
                        .slider::-moz-range-thumb {
                          height: 20px;
                          width: 20px;
                          border-radius: 50%;
                          background: #3b82f6;
                          cursor: pointer;
                          border: none;
                        }
                      `}</style>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => {
                const stockStatus = getStockStatus(product.quantity);
                const avgRating = ratings[product.id] || 0;
                const userRating = userRatings[product.id] || 0;

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Product Image */}
                    <Link to={`/products/${product.id}`}>
                      <div className="relative overflow-hidden cursor-pointer">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Stock Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`${stockStatus.bgColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                          >
                            {stockStatus.text}
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 cursor-pointer ${
                              i < (userRating || Math.round(avgRating))
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-600"
                            }`}
                            onClick={() => submitRating(product.id, i + 1)}
                          />
                        ))}
                        <span className="text-gray-400 text-sm ml-2">
                          {(Number(avgRating) || 0).toFixed(1)}
                        </span>
                      </div>

                      {/* Price and Stock */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-white">
                          ${product.price}
                        </span>
                        <span
                          className={`text-sm font-semibold ${stockStatus.textColor}`}
                        >
                          {stockStatus.text}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={product.quantity === 0}
                          onClick={() => handleAddToCart(product)}
                          className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                            product.quantity === 0
                              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {product.quantity === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                        </motion.button>

                        <Link to={`/products/${product.id}`} className="flex-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full border border-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-700 transition-all duration-300"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </motion.button>
                        </Link>
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-700">
                        <div className="text-center">
                          <div className="text-green-400 text-sm font-semibold">
                            Free
                          </div>
                          <div className="text-gray-400 text-xs">Shipping</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 text-sm font-semibold">
                            2 Year
                          </div>
                          <div className="text-gray-400 text-xs">Warranty</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our support team and we'll help you find the perfect tech
              solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
              >
                Request a Product
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
