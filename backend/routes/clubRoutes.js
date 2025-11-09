import express from "express";
import {
  createClubPost,
  getClubPosts,
  getClubPost,
  updateClubPost,
  deleteClubPost,
} from "../controllers/clubController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getClubPosts);
router.get("/:id", getClubPost);
router.post("/", auth, createClubPost);
router.put("/:id", auth, updateClubPost);
router.delete("/:id", auth, deleteClubPost);

export default router;
