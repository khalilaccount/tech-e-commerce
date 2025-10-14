import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart - FIXED: Now returns true/false
  const addToCart = async (product, qty = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return false; // Return false if no token

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/cart",
        {
          item_id: product.id,
          quantity: qty,
          image_url: product.image_url,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Added to cart:", data);

      // Update local state: replace existing item or add new
      setCartItems((prev) => {
        const index = prev.findIndex(
          (i) => i.item_id === data.cartItem.item_id
        );
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = data.cartItem;
          return updated;
        }
        return [...prev, data.cartItem];
      });

      return true; // ✅ SUCCESS - return true
    } catch (err) {
      console.error("❌ Failed to add to cart:", err);
      return false; // ❌ FAILURE - return false
    }
  };

  // Get total count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
