import express from "express";
import {
  getProducts,
  createProduct,
  getLatestProducts,
} from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/auth_middleware.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/create", verifyAdmin, createProduct);

router.get("/getlatest", getLatestProducts);

export default router;
