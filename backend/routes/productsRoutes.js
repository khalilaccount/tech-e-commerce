import express from "express";
import {
  getProducts,
  createProduct,
  getLatestProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/auth_middleware.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/create", createProduct);

router.get("/getlatest", getLatestProducts);

router.get("/:id", getSingleProduct);

export default router;
