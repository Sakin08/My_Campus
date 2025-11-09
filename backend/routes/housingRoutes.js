import express from "express";
import { createHousing, getHousings } from "../controllers/housingController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getHousings);
router.post("/", protect, createHousing);

export default router;
