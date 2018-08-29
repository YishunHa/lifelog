import mongoose from "mongoose";
const GPSSchema = new mongoose.Schema({
  UploadBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now
  },
  file: {
    data: Buffer,
    contentType: String
  },
  taken: {
    type: Date
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
});

export default mongoose.model("GPS", GPSSchema);
