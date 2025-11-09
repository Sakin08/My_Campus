import express from "express";
import { createPost, getPosts, getPost } from "../controllers/buySellController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", protect, createPost);

export default router;
