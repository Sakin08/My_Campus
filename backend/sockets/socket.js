import { Server } from "socket.io";
import Message from "../models/Message.js";
import { generateChatId } from "../controllers/messageController.js";

let onlineUsers = new Map();

/**
 * Initializes socket.io server
 * @param {http.Server} server
 */
export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    // Save online users
    socket.on("userOnline", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    // Join chat room
    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
    });

    // Send message
    socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
      try {
        const chatId = generateChatId(senderId, receiverId);

        const newMsg = await Message.create({ chatId, senderId, receiverId, message });

        io.to(chatId).emit("receiveMessage", newMsg);

        // Optional: Notify receiver if online but not in room
        const receiverSocket = onlineUsers.get(receiverId);
        if (receiverSocket) {
          io.to(receiverSocket).emit("newChatNotification", newMsg);
        }
      } catch (err) {
        console.error("Socket message error:", err.message);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log("❌ Disconnected:", socket.id);
    });
  });

  return io;
};
