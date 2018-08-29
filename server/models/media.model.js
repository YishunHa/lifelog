import mongoose from "mongoose";
import crypto from "crypto";
const MediaSchema = new mongoose.Schema({
  text: {
    type: String
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  mediaedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  },
  taken: {
    type: Date,
    required: "Date is required"
  },
  longitude: {
    type: Number,
    required: "Longitude is required"
  },
  latitude: {
    type: Number,
    required: "Latitude is required"
  }
});

export default mongoose.model("Media", MediaSchema);
