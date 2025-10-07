import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const LatestProductsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/getlatest"
        );
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch latest products:", err);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (products.length > 0) {
      setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (products.length > 0) {
      setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, products.length]);

  // Don't render if no products
  if (products.length === 0) {
    return (
      <section className="pt-20 pb-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-lg">Loading latest products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Products
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our newest arrivals and cutting-edge technology
          </p>
        </motion.div>

        {/* Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slider */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-800 rounded-2xl p-8">
                    {/* Product Image */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="relative bg-gray-900 rounded-2xl p-8">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-80 object-contain rounded-lg"
                        />
                        {/* Always show NEW badge for latest products */}
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          NEW
                        </div>
                        {/* Optional: Show SALE badge if you want */}
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          LATEST
                        </div>
                      </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-white space-y-6"
                    >
                      <div>
                        {/* Generic category or you can derive from name */}
                        <span className="text-blue-400 font-semibold">
                          Featured Product
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">
                          {product.name}
                        </h3>

                        {/* Rating - Using default values since not in API */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < 4 // Default 4-star rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-400">
                            4.5 (120 reviews) {/* Default values */}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-3xl font-bold text-white">
                            ${product.price}
                          </span>
                          {/* Optional: Show original price if you have discount logic */}
                          {/* <span className="text-xl text-gray-400 line-through">
                            ${(product.price * 1.2).toFixed(2)}
                          </span>
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                            Save 20%
                          </span> */}
                        </div>

                        {/* Description - Generic since not in API */}
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                          Experience premium quality and cutting-edge innovation
                          with our latest {product.name.toLowerCase()}. Designed
                          for excellence and built to perform.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </motion.button>
                          <Link to={`/products/${product.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-700 transition-all duration-300"
                            >
                              <Eye className="w-5 h-5" />
                              View Details
                            </motion.button>
                          </Link>
                        </div>

                        {/* Features - Static list */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          {[
                            "Free Shipping",
                            "2-Year Warranty",
                            "30-Day Returns",
                            "24/7 Support",
                          ].map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-gray-400"
                            >
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {products.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator - Only show if multiple products */}
          {products.length > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-500 w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestProductsSlider;
