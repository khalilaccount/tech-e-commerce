import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000; // fallback port

// Test DB connection
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/admin", adminRoutes);

app.use("/api/products", productsRoutes);

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
