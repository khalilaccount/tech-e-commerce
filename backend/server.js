import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

import { connectDB } from "./config/db.js";
import "./config/passport.js"; // ✅ this loads the JWT strategy

import adminRoutes from "./routes/adminRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import ratingRoute from "./routes/ratingRoute.js";
import authRouter from "./routes/authRouter.js";
import ordersRoutes from "./routes/ordersRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your React app URL
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectDB();

app.use(passport.initialize()); // ✅ enable passport

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/ratings", ratingRoute);
app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
