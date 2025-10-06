import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

export const registerAdmin = async (req, res) => {
  // 1. First, check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // 2. Get data from validated request body
  const { name, email, password } = req.body;

  try {
    // 3. Check if admin already exists
    const adminCheck = await pool.query(
      "SELECT * FROM users WHERE role = 'admin'"
    );

    if (adminCheck.rows.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // 4. Check if email already exists
    const emailCheck = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Insert new admin
    const query = `
      INSERT INTO users (name, email, password, role) 
      VALUES ($1, $2, $3, 'admin') 
      RETURNING id, name, email, role
    `;

    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values);

    // 7. Return success response
    res.status(201).json({
      message: "Admin created successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const adminlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const ressult = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND role = 'admin'",
      [email]
    );
    const admin = ressult.rows[0];
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const testRoute = async (req, res) => {
  try {
    res.send("Working");
  } catch (err) {
    res.send("Not Working");
  }
};
