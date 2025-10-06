import { useState } from "react";
import { FaBox, FaDollarSign, FaHashtag, FaCalendar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  // Standard image URL if no image is provided
  const [imageError, setImageError] = useState(false);
  const defaultImage =
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  const imageUrl = product.image_url || defaultImage;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="h-48 bg-gray-700 overflow-hidden">
        <img
          src={defaultImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-white mb-2 truncate">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center text-gray-300 mb-2">
          <FaDollarSign className="h-4 w-4 text-green-400 mr-2" />
          <span className="text-xl font-bold text-white">
            {parseFloat(product.price).toFixed(2)}
          </span>
        </div>

        {/* Quantity */}
        <div className="flex items-center text-gray-300 mb-3">
          <FaHashtag className="h-4 w-4 text-blue-400 mr-2" />
          <span>Quantity: </span>
          <span
            className={`ml-1 font-semibold ${
              product.quantity > 10
                ? "text-green-400"
                : product.quantity > 5
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {product.quantity}
          </span>
        </div>

        {/* Created Date */}
        <div className="flex items-center text-gray-400 text-sm">
          <FaCalendar className="h-3 w-3 mr-2" />
          <span>Added: {formatDate(product.created_at)}</span>
        </div>

        {/* Stock Status Badge */}
        <div className="mt-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              product.quantity > 10
                ? "bg-green-900 text-green-300"
                : product.quantity > 5
                ? "bg-yellow-900 text-yellow-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            <FaBox className="h-3 w-3 mr-1" />
            {product.quantity > 10
              ? "In Stock"
              : product.quantity > 5
              ? "Low Stock"
              : "Very Low"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 bg-gray-750 border-t border-gray-700 flex space-x-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
          Edit
        </button>
        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
