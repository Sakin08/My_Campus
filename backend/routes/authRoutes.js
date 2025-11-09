// backend/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, getMe, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateProfile); // ← NEW

export default router;