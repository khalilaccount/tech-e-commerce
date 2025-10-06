import { motion } from "framer-motion";
import { Truck, CreditCard, Shield, HeadphonesIcon } from "lucide-react";

const HomeServices = () => {
  const services = [
    {
      icon: Truck,
      title: "Free Shipping",
      description:
        "Free delivery for orders above $50. Fast and reliable shipping worldwide.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description:
        "100% secure payment processing. Your financial data is protected.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "30-day money-back guarantee. We stand behind our products.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to help you with any issues.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the best shopping experience with premium services that
            put you first.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 h-full">
                {/* SVG Icon Container */}
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Floating Decorative Element */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-4 border-white">
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-r ${service.color} opacity-20`}
                    ></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Line Effect */}
                <div className="mt-6">
                  <div
                    className={`w-0 group-hover:w-12 h-1 bg-gradient-to-r ${service.color} rounded-full transition-all duration-300`}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Premium Service?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their tech
              needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Start Shopping Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeServices;
