import { pool } from "../config/db.js";

// Optimized minimal version
export const getProducts = async (req, res) => {
  try {
    // Select only needed columns, not *
    const { rows } = await pool.query(`
      SELECT id, name, price, quantity, image_url,  created_at 
      FROM items 
      WHERE quantity > 0 
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity = 0, image_url } = req.body;

    // Validate required fields
    if (!name || price == null) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Insert product with image_url
    const {
      rows: [product],
    } = await pool.query(
      `INSERT INTO items (name, price, quantity, image_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, price, quantity, image_url`,
      [name, parseFloat(price), parseInt(quantity), image_url || null]
    );

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getLatestProducts = async (req, res) => {
  try {
    const { rows } = await pool.query(`
        SELECT id, name, price, quantity, image_url, created_at 
      FROM items 
      ORDER BY id DESC LIMIT 5
      `);
    res.json(rows);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `SELECT id, name, price, quantity, image_url, created_at
       FROM items
       WHERE id = $1`,
      [id]
    );

    console.log(rows);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(rows[0]); // ✅ send the single product
  } catch (err) {
    console.error("Get single product error:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};
