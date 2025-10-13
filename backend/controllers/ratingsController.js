import { pool } from "../config/db.js";

export const addRating = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Passport JWT adds this
    const { item_id, rating } = req.body;

    if (!item_id || !rating) {
      return res
        .status(400)
        .json({ message: "item_id and rating are required" });
    }

    // 🔹 Check if the user already rated this product
    const existing = await pool.query(
      "SELECT * FROM ratings WHERE item_id = $1 AND user_id = $2",
      [item_id, userId]
    );

    if (existing.rows.length > 0) {
      // 🔁 Update rating
      await pool.query(
        "UPDATE ratings SET rating = $1, created_at = NOW() WHERE item_id = $2 AND user_id = $3",
        [rating, item_id, userId]
      );
    } else {
      // 🆕 Insert rating
      await pool.query(
        "INSERT INTO ratings (item_id, user_id, rating) VALUES ($1, $2, $3)",
        [item_id, userId, rating]
      );
    }

    // 🔹 Compute updated average rating
    const { rows } = await pool.query(
      "SELECT ROUND(AVG(rating), 1) AS average FROM ratings WHERE item_id = $1",
      [item_id]
    );

    res.status(200).json({
      message: "Rating saved successfully",
      average: rows[0].average,
    });
  } catch (error) {
    console.error("Error saving rating:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get ratings for all products or a specific product
export const getProductRatings = async (req, res) => {
  try {
    const { productId } = req.params;

    let query;
    let values = [];

    if (productId) {
      query = `
        SELECT r.id, r.item_id, r.user_id, r.rating, u.username as username
        FROM ratings r
        JOIN users u ON u.id = r.user_id
        WHERE r.item_id = $1
      `;
      values = [productId];
    } else {
      query = `
        SELECT r.id, r.item_id, r.user_id, r.rating, u.username as username
        FROM ratings r
        JOIN users u ON u.id = r.user_id
      `;
    }

    const { rows } = await pool.query(query, values);

    // Optional: compute average rating and count per product
    const ratingsByProduct = {};
    rows.forEach((r) => {
      if (!ratingsByProduct[r.item_id]) {
        ratingsByProduct[r.item_id] = { average: 0, count: 0, ratings: [] };
      }
      ratingsByProduct[r.item_id].ratings.push({
        userId: r.user_id,
        rating: Number(r.rating),
      });
      ratingsByProduct[r.item_id].count += 1;
      ratingsByProduct[r.item_id].average += Number(r.rating);
    });

    for (let key in ratingsByProduct) {
      const r = ratingsByProduct[key];
      r.average = r.count > 0 ? r.average / r.count : 0;
    }

    res.json(ratingsByProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch ratings" });
  }
};

// 🔹 Get all ratings with averages
export const getAllRatings = async (req, res) => {
  try {
    const query = `
      SELECT r.id, r.item_id, r.user_id, r.rating, u.username as username
      FROM ratings r
      JOIN users u ON u.id = r.user_id
    `;
    const { rows } = await pool.query(query);

    const ratingsByProduct = {};
    rows.forEach((r) => {
      if (!ratingsByProduct[r.item_id]) {
        ratingsByProduct[r.item_id] = { average: 0, count: 0, ratings: [] };
      }
      ratingsByProduct[r.item_id].ratings.push({
        userId: r.user_id,
        rating: Number(r.rating),
      });
      ratingsByProduct[r.item_id].count += 1;
      ratingsByProduct[r.item_id].average += Number(r.rating);
    });

    for (let key in ratingsByProduct) {
      const r = ratingsByProduct[key];
      r.average = r.count > 0 ? r.average / r.count : 0;
    }

    res.json(ratingsByProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch ratings" });
  }
};
