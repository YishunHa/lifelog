import mongoose from "mongoose";
import crypto from "crypto";
const MediaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Name is required"
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      mediaedBy: { type: mongoose.Schema.ObjectId, ref: "User" }
    }
  ],
  mediaedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Media", MediaSchema);
