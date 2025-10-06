import React, { useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaImage,
  FaDollarSign,
  FaBox,
  FaHashtag,
} from "react-icons/fa";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "0",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/products/create", formData);

      setMessage("Product created successfully!");
      setFormData({
        name: "",
        price: "",
        quantity: "0",
        image_url: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
        <p className="text-gray-400">Create a new product for your inventory</p>
      </div>

      {/* Form Card */}
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700  md:w-72 lg:w-[500px] ">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Product Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBox className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 transition duration-200"
                placeholder="Enter product name"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Price *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 transition duration-200"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Quantity
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaHashtag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 transition duration-200"
                placeholder="0"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image_url"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Image URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaImage className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="image_url"
                name="image_url"
                type="url"
                value={formData.image_url}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 transition duration-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Image Preview */}
          {formData.image_url && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image Preview
              </label>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="max-w-full max-h-48 mx-auto rounded"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Message */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.includes("successfully")
                  ? "bg-green-900 border border-green-700 text-green-300"
                  : "bg-red-900 border border-red-700 text-red-300"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Product...</span>
              </>
            ) : (
              <>
                <FaPlus className="h-5 w-5" />
                <span>Create Product</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Form Tips */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Form Tips:</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Fields marked with * are required</li>
          <li>• Price should be in decimal format (e.g., 29.99)</li>
          <li>• Quantity defaults to 0 if not specified</li>
          <li>• Image URL should be a direct link to the image</li>
        </ul>
      </div>
    </div>
  );
};

export default AddProduct;
