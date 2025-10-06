import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Star, ShoppingCart, Eye, Package } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // start loading before API call
        const response = await axios.get("http://localhost:5000/api/products");

        // Optional: simulate a small delay
        setTimeout(() => {
          setProducts(response.data);
          setFilteredProducts(response.data);
          setLoading(false); // stop loading
        }, 1000);
      } catch (err) {
        console.error("Failed to fetch latest products:", err);
        setLoading(false); // stop loading on error too
      }
    };

    fetchProducts(); // ✅ call the function
  }, []);

  // Dummy data matching your database structure
  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

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

      {/* Search Section */}
      <section className="py-8 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Results Count */}
            <div className="text-gray-300">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
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
                Try adjusting your search terms
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => {
                const stockStatus = getStockStatus(product.quantity);

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
                    <Link to={`/product/${product.id}`}>
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
                        {/* ... other image overlays ... */}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                        {product.name}
                      </h3>

                      {/* Rating - Using default values */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">4.5 (120)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
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

                        <Link to={`/product/${product.id}`} className="flex-1">
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

export default ProductsPage;
