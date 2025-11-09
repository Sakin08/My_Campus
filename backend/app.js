// backend/app.js
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies, Authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
//app.options("*", cors(corsOptions));

// Middleware
// Parse JSON and urlencoded bodies with increased size limits (for profile updates with images)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// Routes
app.use("/api/auth", authRoutes);

export default app;