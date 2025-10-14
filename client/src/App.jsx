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
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import OrderSuccess from "./pages/OrderSuccess";
{
  /* Auth Routes */
}
import RequestReset from "./pages/RequestReset";
import VerifyResetCode from "./pages/VerifyResetCode";
import ResetPassword from "./pages/ResetPassword";

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
            <Route path="/cart" element={<CartPage />} />;
            <Route path="/order" element={<OrderPage />} />
            <Route path="/request-reset" element={<RequestReset />} />
            <Route path="/verify-code" element={<VerifyResetCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            // Add this to your routes
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
