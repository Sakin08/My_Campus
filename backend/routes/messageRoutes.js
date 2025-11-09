import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/:chatId", auth, getMessages);
router.post("/", auth, sendMessage);

export default router;
