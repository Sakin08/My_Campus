import express from "express";
import { createSportPost, getSportsPosts } from "../controllers/sportsController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getSportsPosts);
router.post("/", protect, createSportPost);

export default router;
