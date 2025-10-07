import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/TestRegister";
import Login from "./pages/Login";

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
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/:id" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
