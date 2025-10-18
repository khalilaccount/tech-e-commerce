import { pool } from "../config/db.js";

// POST /api/cart
export const addToCart = async (req, res) => {
  try {
    const { item_id, quantity = 1 } = req.body;
    const userId = req.user.id;

    const { rows } = await pool.query(
      `INSERT INTO carts (user_id, item_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, item_id)
       DO UPDATE SET quantity = carts.quantity + EXCLUDED.quantity
       RETURNING *`,
      [userId, item_id, quantity]
    );

    res.status(200).json({ message: "Added to cart", cartItem: rows[0] });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await pool.query(
      `SELECT c.item_id, c.quantity, i.name, i.price, i.image_url
       FROM carts c
       JOIN items i ON c.item_id = i.id
       WHERE c.user_id = $1`,
      [userId]
    );

    res.status(200).json({ cartItems: rows });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

// remove from cart and update

// DELETE /api/cart/:item_id - Remove single item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { item_id } = req.params;
    const userId = req.user.id;

    const { rows } = await pool.query(
      `DELETE FROM carts 
       WHERE user_id = $1 AND item_id = $2 
       RETURNING *`,
      [userId, item_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    res
      .status(200)
      .json({ message: "Item removed from cart", removedItem: rows[0] });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

// DELETE /api/cart - Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await pool.query(
      `DELETE FROM carts 
       WHERE user_id = $1 
       RETURNING *`,
      [userId]
    );

    res.status(200).json({
      message: "Cart cleared successfully",
      removedItems: rows,
    });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};

// PUT /api/cart/:item_id - Update item quantity
// In your cartController.js - updateCartItem function
export const updateCartItem = async (req, res) => {
  try {
    const { item_id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    console.log(
      `🔄 Updating cart: userId=${userId}, item_id=${item_id}, quantity=${quantity}`
    );

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const { rows } = await pool.query(
      `UPDATE carts 
       SET quantity = $1, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $2 AND item_id = $3
       RETURNING *`,
      [quantity, userId, item_id]
    );

    if (rows.length === 0) {
      console.error("❌ Item not found in cart");
      return res.status(404).json({ error: "Item not found in cart" });
    }

    console.log("✅ Cart updated successfully:", rows[0]);
    res.status(200).json({
      message: "Cart item updated",
      cartItem: rows[0],
    });
  } catch (err) {
    console.error("❌ Database error:", err);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};
