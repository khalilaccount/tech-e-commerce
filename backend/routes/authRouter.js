import {
  requestPasswordReset,
  resetPassword,
  verifyResetCode,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/request-reset", requestPasswordReset);
router.post("/verify-code", verifyResetCode);
router.post("/resetPassword", resetPassword);

export default router;
