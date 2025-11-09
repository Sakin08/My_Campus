import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", protect, createEvent);

export default router;
