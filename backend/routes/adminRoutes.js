import {
  registerAdmin,
  testRoute,
  adminlogin,
} from "../controllers/adminController.js";
import { body } from "express-validator";
import express from "express";

const router = express.Router();

const validateAdminRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

router.post("/register", validateAdminRegistration, registerAdmin);

router.post("/login", adminlogin); // Fixed typo

router.get("/test", testRoute);

export default router;
