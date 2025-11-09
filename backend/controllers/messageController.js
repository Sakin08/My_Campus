import Message from "../models/Message.js";
import crypto from "crypto";

/**
 * Deterministic chat ID helper
 * Example: hash(sorted(userA,userB).join(':'))
 */
export const generateChatId = (userA, userB) => {
  const sorted = [userA.toString(), userB.toString()].sort().join(":");
  return crypto.createHash("sha256").update(sorted).digest("hex").slice(0, 24);
};

// Fetch chat messages
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send message via REST (used if socket not available)
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id;
    const chatId = generateChatId(senderId, receiverId);

    const newMsg = await Message.create({ chatId, senderId, receiverId, message });
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
