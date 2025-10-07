import express from "express";
import { body, validationResult } from "express-validator"; // ✅ include validationResult
import { register, login } from "../controllers/userControllers.js";

const router = express.Router();

const validateUserRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

router.post("/register", validateUserRegistration, (req, res, next) => {
  const errors = validationResult(req); // ✅ now works
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  register(req, res, next);
});

router.post("/login", login);

router.get("/test", (req, res) => {
  res.send("Route is working ✅");
});

export default router;
