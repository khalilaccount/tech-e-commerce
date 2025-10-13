import crypto from "crypto";
import nodemailer from "nodemailer";
import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ message: "No user found with this email" });

    const resetCode = crypto.randomInt(10000, 99999).toString();

    // Save reset code temporarily
    await pool.query(
      "UPDATE users SET reset_code = $1, reset_expires = NOW() + INTERVAL '10 minutes' WHERE email = $2",
      [resetCode, email]
    );

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is ${resetCode}. It expires in 10 minutes.`,
    });

    // ✅ Always send a response to end the request
    res.status(200).json({ message: "Reset code sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send reset code" });
  }
};

export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND reset_code::text = $2 AND reset_expires > NOW()",
      [email, code]
    );

    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid or expired code" });

    res.json({ message: "Code verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // Validate code again
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND reset_code = $2 AND reset_expires > NOW()",
      [email, code]
    );

    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid or expired code" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = $1, reset_code = NULL, reset_expires = NULL WHERE email = $2",
      [hashed, email]
    );

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password" });
  }
};
