import { pool } from "../config/db.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, name, price, stock AS quantity, image_url, category, created_at
      FROM items
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity = 0, image_url, category } = req.body;

    if (!name || price == null) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const {
      rows: [product],
    } = await pool.query(
      `INSERT INTO items (name, price, stock, image_url, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, price, stock AS quantity, image_url, category, created_at`,
      [
        name,
        parseFloat(price),
        parseInt(quantity),
        image_url || null,
        category || null,
      ]
    );

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Get latest products
export const getLatestProducts = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, name, price, stock AS quantity, image_url, category, created_at
      FROM items 
      ORDER BY id DESC 
      LIMIT 5
    `);
    res.json(rows);
  } catch (err) {
    console.error("Get latest products error:", err);
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
};

// Get single product
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `SELECT id, name, price, stock AS quantity, image_url, category, created_at
       FROM items
       WHERE id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get single product error:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};
