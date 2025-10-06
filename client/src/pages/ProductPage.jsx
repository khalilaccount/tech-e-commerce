import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  Plus,
  Minus,
  Heart,
  Share2,
  Package,
  CheckCircle,
} from "lucide-react";
import { ShopContext } from "../content/ShopContent";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        console.log(response.data);
        // Simulate a small delay for better UX
        setTimeout(() => {
          setProduct(response.data);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addToCart(product.id, quantity);
    setIsAddingToCart(false);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) {
      return { text: "Out of Stock", color: "text-red-500", bg: "bg-red-500" };
    } else if (quantity < 5) {
      return {
        text: "Low Stock",
        color: "text-orange-500",
        bg: "bg-orange-500",
      };
    } else {
      return { text: "In Stock", color: "text-green-500", bg: "bg-green-500" };
    }
  };

  // Generate additional images array from the single image_url
  const getProductImages = (product) => {
    if (!product) return [];

    // If you have multiple images in your database, you can modify this
    // For now, we'll use the same image multiple times as placeholder
    return [
      product.image_url,
      product.image_url, // You can replace these with actual different images
      product.image_url,
    ];
  };

  // Generate features based on product data
  const getProductFeatures = (product) => {
    if (!product) return [];

    const baseFeatures = [
      "Premium quality materials",
      "Advanced technology integration",
      "User-friendly design",
      "Durable construction",
      "Excellent customer support",
    ];

    // You can customize features based on product name or other attributes
    if (product.name.toLowerCase().includes("phone")) {
      return [
        "High-resolution display",
        "Advanced camera system",
        "Long battery life",
        "Fast processor",
        "5G connectivity",
      ];
    } else if (product.name.toLowerCase().includes("laptop")) {
      return [
        "Powerful performance",
        "High-resolution display",
        "Long battery life",
        "Lightweight design",
        "Fast storage",
      ];
    }

    return baseFeatures;
  };

  // Generate specifications based on product data
  const getProductSpecifications = (product) => {
    if (!product) return {};

    const baseSpecs = {
      Price: `$${product.price}`,
      Availability: product.quantity > 0 ? "In Stock" : "Out of Stock",
      SKU: `TS-${product.id.toString().padStart(4, "0")}`,
      Category: "Electronics",
      Warranty: "2 Years",
    };

    // Customize specs based on product type
    if (product.name.toLowerCase().includes("phone")) {
      return {
        ...baseSpecs,
        Display: "6.1-inch Super Retina",
        Storage: "128GB / 256GB / 512GB",
        Camera: "Dual/Triple Camera System",
        Battery: "All-day battery life",
        Connectivity: "5G, Wi-Fi 6, Bluetooth 5.0",
      };
    } else if (product.name.toLowerCase().includes("laptop")) {
      return {
        ...baseSpecs,
        Display: "13.3-inch Retina Display",
        Processor: "Apple M-series / Intel Core i7",
        Memory: "8GB / 16GB RAM",
        Storage: "256GB / 512GB SSD",
        "Operating System": "macOS / Windows 11",
      };
    }

    return baseSpecs;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.quantity);
  const productImages = getProductImages(product);
  const productFeatures = getProductFeatures(product);
  const productSpecifications = getProductSpecifications(product);

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg"
              />
            </motion.div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-gray-800 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      selectedImage === index
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stock Status */}
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${stockStatus.bg} text-white`}
              >
                {stockStatus.text}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Package className="w-4 h-4" />
                {product.quantity} units available
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400">4.5 (120 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-white">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description ||
                  `Experience the exceptional quality and performance of the ${product.name}. This premium product combines cutting-edge technology with elegant design to deliver an unparalleled user experience.`}
              </p>
            </div>

            {/* Features */}
            {productFeatures.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {productFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="p-3 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 text-white font-semibold min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(product.quantity, prev + 1)
                      )
                    }
                    disabled={quantity >= product.quantity}
                    className="p-3 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-400">
                  Max: {product.quantity} units
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                onClick={handleAddToCart}
                disabled={product.quantity === 0 || isAddingToCart}
                whileHover={{ scale: product.quantity === 0 ? 1 : 1.02 }}
                whileTap={{ scale: product.quantity === 0 ? 1 : 0.98 }}
                className={`flex-1 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
                  product.quantity === 0
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </>
                )}
              </motion.button>

              <button className="p-4 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-4 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-3 text-gray-300">
                <Truck className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="font-semibold">Free Shipping</div>
                  <div className="text-sm text-gray-400">
                    On orders over $50
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield className="w-6 h-6 text-green-400" />
                <div>
                  <div className="font-semibold">2-Year Warranty</div>
                  <div className="text-sm text-gray-400">Full protection</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <RefreshCw className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="font-semibold">30-Day Returns</div>
                  <div className="text-sm text-gray-400">
                    No questions asked
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-16 border-t border-gray-700"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Specifications</h2>
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(productSpecifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-3 border-b border-gray-700"
                >
                  <span className="text-gray-400 font-medium">{key}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
