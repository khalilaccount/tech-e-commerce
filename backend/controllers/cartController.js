import { pool } from "../config/db.js";

// POST /api/cart
export const addToCart = async (req, res) => {
  try {
    const { item_id, quantity = 1, image_url } = req.body;
    const userId = req.user.id;

    const { rows } = await pool.query(
      `INSERT INTO user_items (user_id, item_id, quantity, image_url)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, item_id)
       DO UPDATE SET quantity = user_items.quantity + EXCLUDED.quantity
       RETURNING *`,
      [userId, item_id, quantity, image_url]
    );

    res.status(200).json({ message: "Added to cart", cartItem: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("Req User:", req.user);

    const { rows } = await pool.query(
      `SELECT ui.item_id, ui.quantity, ui.image_url, i.name, i.price
       FROM user_items ui
       JOIN items i ON ui.item_id = i.id
       WHERE ui.user_id = $1`,
      [userId]
    );

    res.status(200).json({ cartItems: rows });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};
