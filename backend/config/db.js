import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "techecommerce",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

export const connectDB = async () => {
  try {
    pool.connect();
    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit();
  }
};
