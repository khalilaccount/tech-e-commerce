import express from "express";
import passport from "passport";
import {
  addRating,
  getProductRatings,
  getAllRatings,
} from "../controllers/ratingsController.js";

const router = express.Router();

// Only logged-in users can post a rating
router.post("/", passport.authenticate("jwt", { session: false }), addRating);
// Get ratings for a specific product
router.get(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  getProductRatings
);

router.get("/", getAllRatings);
export default router;
