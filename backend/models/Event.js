import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    organizer: { type: String },
    date: { type: Date },
    time: { type: String },
    venue: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
