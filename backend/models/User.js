import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

class User {
  // Create a new user (registration)

  static async create({ username, email, phone_number, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
    INSERT INTO users (username, email, phone_number, password, role)
    VALUES ($1, $2, $3, $4, 'customer')
    RETURNING id, username, email, phone_number, role, created_at
  `;

    const values = [username, email, phone_number, hashedPassword];
    const result = await pool.query(query, values);

    return result.rows[0];
  }

  // Find user by email (for login)
  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  // Find user by ID (for JWT verification)

  static async findById(id) {
    const reslult = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return reslult.rows[0];
  }

  // Optional: find all users (for admin)
  static async findAll() {
    const result = await pool.query(
      "SELECT id, username, email, role, created_at FROM users"
    );
    return result.rows;
  }
}

export default User;
