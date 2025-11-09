import express from "express";
import User from "../models/User.js";
import BuySellPost from "../models/BuySellPost.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Get all students
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "student" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve or Ban a student
router.put("/users/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const { verified } = req.body; // true = approve, false = ban
    const user = await User.findByIdAndUpdate(req.params.id, { verified }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a BuySell Post
router.delete("/buysell/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await BuySellPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
