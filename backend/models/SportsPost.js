import mongoose from "mongoose";

const sportsSchema = new mongoose.Schema(
  {
    sportName: { type: String, required: true },
    description: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("SportsPost", sportsSchema);
