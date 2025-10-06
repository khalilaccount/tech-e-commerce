import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Award,
  Globe,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";
import { useState } from "react";

const AboutPage = () => {
  const [activeLocation, setActiveLocation] = useState("new-york");

  const locations = {
    "new-york": {
      name: "New York HQ",
      address: "123 Tech Street, Manhattan, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@techstore.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    },
    london: {
      name: "London Office",
      address: "456 Innovation Lane, London, UK EC2A 4NE",
      phone: "+44 20 1234 5678",
      email: "london@techstore.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-2PM",
    },
    tokyo: {
      name: "Tokyo Branch",
      address: "789 Shibuya Cross, Tokyo, Japan 150-0043",
      phone: "+81 3 1234 5678",
      email: "tokyo@techstore.com",
      hours: "Mon-Fri: 10AM-7PM, Sat: 11AM-5PM",
    },
  };

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image:
        "https://media.istockphoto.com/id/1265176370/photo/portrait-of-a-confident-young-businessman.jpg?s=612x612&w=0&k=20&c=Hr5Rn3WlBied-o4Qu2LiRc6wP_eHI8UMG9rl1v-_a9s=",
      bio: "Former tech executive with 15+ years in e-commerce",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Tech innovator specializing in scalable solutions",
    },
    {
      name: "Emily Watson",
      role: "Head of Customer Experience",
      image:
        "https://t3.ftcdn.net/jpg/05/40/63/14/360_F_540631446_a39tc1A3Smh7U2xbyijSEKGrx4FbJW6F.jpg",
      bio: "Customer service expert with a passion for tech",
    },
    {
      name: "David Kim",
      role: "Product Director",
      image:
        "https://t4.ftcdn.net/jpg/03/69/19/81/360_F_369198116_K0sFy2gRTo1lmIf5jVGeQmaIEibjC3NN.jpg",
      bio: "Product strategist with keen eye for innovation",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We prioritize your data security and build trust through transparent practices.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Our customers are at the heart of everything we do and every decision we make.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Bringing cutting-edge technology to customers worldwide with local expertise.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to delivering exceptional quality in products and services.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                TechStore
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing the way people discover and experience
              technology. From humble beginnings to global reach, our mission
              remains the same.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-blue-600">Story</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2015, TechStore began as a small startup with a big
                vision: to make cutting-edge technology accessible to everyone.
                What started as a passion project in a garage has grown into a
                global e-commerce platform serving millions of customers
                worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we partner with leading tech brands and innovators to
                bring you the latest gadgets, devices, and accessories. Our
                commitment to quality, customer service, and innovation
                continues to drive us forward.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Read Our Blog
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1604328703693-18313fe20f3a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Our office"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-2xl">
                <div className="text-2xl font-bold">8+ Years</div>
                <div className="text-sm opacity-90">Of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at TechStore.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind TechStore's success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Locations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Us{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visit our offices or get in touch with our global teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Location Selector */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Locations
                </h3>
                <div className="space-y-4">
                  {Object.entries(locations).map(([key, location]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveLocation(key)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        activeLocation === key
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <MapPin
                          className={`w-5 h-5 mt-1 ${
                            activeLocation === key
                              ? "text-blue-500"
                              : "text-gray-400"
                          }`}
                        />
                        <div>
                          <h4
                            className={`font-semibold ${
                              activeLocation === key
                                ? "text-blue-600"
                                : "text-gray-900"
                            }`}
                          >
                            {location.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {location.address}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Map and Location Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Interactive Map */}
                <div className="h-80 bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                  {/* Simplified Map Visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* World Map Dots */}
                      <div className="flex space-x-8 mb-8">
                        {["new-york", "london", "tokyo"].map((location) => (
                          <motion.div
                            key={location}
                            animate={{
                              scale: activeLocation === location ? 1.2 : 1,
                            }}
                            className={`w-4 h-4 rounded-full cursor-pointer ${
                              activeLocation === location
                                ? "bg-red-500 shadow-lg"
                                : "bg-gray-400"
                            }`}
                            onClick={() => setActiveLocation(location)}
                          />
                        ))}
                      </div>

                      {/* Connection Lines */}
                      <svg
                        className="absolute top-1/2 left-0 w-full h-1"
                        style={{ top: "50%" }}
                      >
                        <line
                          x1="20%"
                          y1="0"
                          x2="80%"
                          y2="0"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Location Labels */}
                  <div className="absolute top-4 left-1/4 transform -translate-x-1/2">
                    <div className="bg-white px-3 py-1 rounded-lg shadow-lg border">
                      <span className="text-sm font-semibold text-gray-900">
                        New York
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white px-3 py-1 rounded-lg shadow-lg border">
                      <span className="text-sm font-semibold text-gray-900">
                        London
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-1/4 transform translate-x-1/2">
                    <div className="bg-white px-3 py-1 rounded-lg shadow-lg border">
                      <span className="text-sm font-semibold text-gray-900">
                        Tokyo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {locations[activeLocation].name}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <span>{locations[activeLocation].address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <Phone className="w-5 h-5 text-green-500" />
                          <span>{locations[activeLocation].phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <Mail className="w-5 h-5 text-purple-500" />
                          <span>{locations[activeLocation].email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <Clock className="w-5 h-5 text-orange-500" />
                          <span>{locations[activeLocation].hours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Get Directions
                      </h4>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Open in Maps
                      </motion.button>
                      <p className="text-sm text-gray-600 mt-3">
                        Click above to get turn-by-turn directions to our
                        location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
