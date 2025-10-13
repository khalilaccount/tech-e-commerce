import { addToCart, getCart } from "../controllers/cartController.js";
import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), addToCart);
router.get("/", passport.authenticate("jwt", { session: false }), getCart);

export default router;
