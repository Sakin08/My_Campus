import mongoose from "mongoose";

const buySellSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    condition: { type: String, enum: ["new", "used"], default: "used" },
    category: { type: String },
    images: [String],
    location: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["available", "sold"], default: "available" },
  },
  { timestamps: true }
);

export default mongoose.model("BuySellPost", buySellSchema);
