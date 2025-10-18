import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items from server
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(data.cartItems || []);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Load cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Add item to cart
  const addToCart = async (product, qty = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/cart",
        {
          item_id: product.id,
          quantity: qty,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Added to cart:", data);

      // Update local state
      setCartItems((prev) => {
        const index = prev.findIndex(
          (i) => i.item_id === data.cartItem.item_id
        );
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            quantity: data.cartItem.quantity,
          };
          return updated;
        }
        return [
          ...prev,
          {
            ...data.cartItem,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
          },
        ];
      });

      return true;
    } catch (err) {
      console.error("❌ Failed to add to cart:", err);
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update local state
      setCartItems((prev) => prev.filter((item) => item.item_id !== itemId));
      return true;
    } catch (err) {
      console.error("❌ Failed to remove from cart:", err);
      return false;
    }
  };

  // Update item quantity
  // In your CartContext - update the updateQuantity function
  const updateQuantity = async (itemId, newQuantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found");
      return false;
    }

    if (newQuantity < 1) {
      return await removeFromCart(itemId);
    }

    try {
      console.log(`🔄 Sending PUT request to: /api/cart/${itemId}`);
      console.log(`📦 Request body:`, { quantity: newQuantity });

      const { data } = await axios.put(
        `http://localhost:5000/api/cart/${itemId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Server response:", data);

      // Update local state
      setCartItems((prev) =>
        prev.map((item) =>
          item.item_id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      return true;
    } catch (err) {
      console.error("❌ Failed to update quantity:", err);
      console.error("❌ Error response:", err.response?.data);
      console.error("❌ Error status:", err.response?.status);
      return false;
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      await axios.delete("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update local state
      setCartItems([]);
      return true;
    } catch (err) {
      console.error("❌ Failed to clear cart:", err);
      return false;
    }
  };

  // Refresh cart data from server
  const refreshCart = async () => {
    await fetchCart();
  };

  // Get total count of items in cart
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Get total price of cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.price) * (item.quantity || 1);
    }, 0);
  };

  // Check if item is in cart
  const isInCart = (itemId) => {
    return cartItems.some((item) => item.item_id === itemId);
  };

  // Get quantity of specific item in cart
  const getItemQuantity = (itemId) => {
    const item = cartItems.find((item) => item.item_id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        getCartCount,
        getCartTotal,
        isInCart,
        getItemQuantity,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
