import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, email, phone_number, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const newUser = await User.create({
      username,
      email,
      phone_number,
      password,
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      phone_number: newUser.phone_number,
      role: newUser.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  Create Login Route */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Create JWT token
    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "1d", // token valid for 1 day
      }
    );

    // 4. Return token + user info
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
