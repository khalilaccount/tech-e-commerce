import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gray-700/50 px-4 py-2 rounded-full border border-gray-600"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                Rated 4.9/5 by Tech Enthusiasts
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-6xl font-bold leading-tight"
            >
              Next Generation{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Tech Gear
              </span>{" "}
              For Modern Life
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
            >
              Discover cutting-edge technology and innovative gadgets that
              elevate your digital experience. From smart devices to premium
              accessories.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Shop Latest Products
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Watch Demo Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoOpen(true)} // open modal
                className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-700/50 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>

              {/* Video Modal */}
              {isVideoOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                  onClick={() => setIsVideoOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header with Close Button */}
                    <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                      <h3 className="text-white font-semibold text-lg">
                        Product Demo
                      </h3>
                      <button
                        onClick={() => setIsVideoOpen(false)}
                        className="text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-all duration-200 transform hover:scale-110"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Video Container */}
                    <div className="relative">
                      <video
                        src="https://www.pexels.com/download/video/6857212/"
                        controls
                        autoPlay
                        muted
                        className="w-full h-auto max-h-[70vh] object-contain"
                        onLoadedData={() => {
                          // Hide loading when video is ready
                          const loadingElement =
                            document.querySelector(".video-loading");
                          if (loadingElement)
                            loadingElement.style.display = "none";
                        }}
                        onError={() => {
                          const loadingElement =
                            document.querySelector(".video-loading");
                          if (loadingElement) {
                            loadingElement.innerHTML = `
                <div class="text-center">
                  <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-6 h-6 text-white" />
                  </div>
                  <p class="text-white text-sm">Failed to load video</p>
                  <p class="text-gray-400 text-xs mt-2">Please check your internet connection</p>
                </div>
              `;
                          }
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>

                      {/* Loading State - Initially visible, hidden by video events */}
                      <div className="video-loading absolute inset-0 flex items-center justify-center bg-gray-900">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-white text-sm">Loading video...</p>
                        </div>
                      </div>
                    </div>

                    {/* Video Controls Info */}
                    <div className="p-4 bg-gray-800 border-t border-gray-700">
                      <p className="text-gray-400 text-sm text-center">
                        Video is muted by default. Use controls to adjust
                        volume.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700"
            >
              {[
                { number: "10K+", label: "Products" },
                { number: "50K+", label: "Customers" },
                { number: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image with SVG Clip */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Container with Shadow */}
            <div className="relative bg-gray-900 rounded-2xl p-8 shadow-2xl shadow-black/50">
              {/* SVG Clip Path Container */}
              <div className="relative">
                <svg width="0" height="0">
                  <defs>
                    <clipPath id="techClip" clipPathUnits="objectBoundingBox">
                      <path d="M0.1,0 C0.04,0.1,0,0.2,0,0.3 C0,0.7,0.3,1,0.7,1 C0.8,1,0.9,0.96,1,0.9 L1,0.1 C0.96,0.04,0.9,0,0.8,0 C0.6,0,0.4,0,0.1,0" />
                    </clipPath>
                  </defs>
                </svg>

                {/* Image with SVG Clip */}
                <div
                  className="w-full h-[500px] rounded-2xl"
                  style={{
                    clipPath: "url(#techClip)",
                    background: "linear-gradient(45deg, #1e40af, #7e22ce)",
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1442&q=80")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                  }}
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-2xl"
              >
                <div className="text-2xl font-bold">$299</div>
                <div className="text-sm opacity-90">Starting From</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
              >
                <div className="text-sm font-semibold">🔥 Hot</div>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
