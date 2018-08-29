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

export default mongoose.model("GPS", GPSSchema);
