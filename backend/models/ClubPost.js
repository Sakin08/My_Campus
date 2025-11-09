import mongoose from "mongoose";

const clubPostSchema = new mongoose.Schema(
  {
    clubName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    attachedFile: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("ClubPost", clubPostSchema);
