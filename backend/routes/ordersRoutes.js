import express from "express";
import {
  createOrder,
  getUserOrders,
  clearUserOrders,
} from "../controllers/orderController.js";
import { verifyUser } from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/", verifyUser, createOrder); // POST /api/orders
router.get("/", verifyUser, getUserOrders); // GET /api/orders
router.delete("/", verifyUser, clearUserOrders); // DELETE /api/orders

export default router;
