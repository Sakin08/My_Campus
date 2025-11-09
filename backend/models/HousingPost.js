import mongoose from "mongoose";

const housingSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Mess", "Flat", "Seat"], required: true },
    location: { type: String, required: true },
    rent: { type: Number },
    description: { type: String },
    contact: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("HousingPost", housingSchema);
