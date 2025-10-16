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
