import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../controllers/cartController.js";
import express from "express";
import passport from "passport";

const router = express.Router();

// Add item to cart
router.post("/", passport.authenticate("jwt", { session: false }), addToCart);

// Get all cart items for user
router.get("/", passport.authenticate("jwt", { session: false }), getCart);

// Remove single item from cart
router.delete(
  "/:item_id",
  passport.authenticate("jwt", { session: false }),
  removeFromCart
);

// Clear entire cart
router.delete("/", passport.authenticate("jwt", { session: false }), clearCart);

// Update item quantity in cart
router.put(
  "/:item_id",
  passport.authenticate("jwt", { session: false }),
  updateCartItem
);

export default router;
