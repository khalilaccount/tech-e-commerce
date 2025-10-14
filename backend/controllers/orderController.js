import { pool } from "../config/db.js";

// ✅ Create new order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id; // From JWT middleware
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { fullName, email, phone, address, city, zipCode, country, items } =
      req.body;

    const totalAmount = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );

    const { rows } = await pool.query(
      `INSERT INTO orders 
        (user_id, full_name, email, phone, address, city, zip_code, country, total_amount, items)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        userId,
        fullName,
        email,
        phone,
        address,
        city,
        zipCode,
        country,
        totalAmount,
        JSON.stringify(items),
      ]
    );

    res
      .status(201)
      .json({ message: "Order created successfully", order: rows[0] });
  } catch (error) {
    console.error("❌ createOrder error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get order details by user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { rows } = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ getUserOrders error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Remove all orders for a user (e.g. after checkout)
export const clearUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await pool.query("DELETE FROM orders WHERE user_id = $1", [userId]);
    res.status(200).json({ message: "User orders cleared successfully" });
  } catch (error) {
    console.error("❌ clearUserOrders error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
