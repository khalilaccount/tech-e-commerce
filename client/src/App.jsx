import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/Products";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="pt-18">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductsPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
