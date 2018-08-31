import mongoose from "mongoose";
const GPSSchema = new mongoose.Schema({
  UploadBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  LINE_ID: {
    type: Number,
    required: "need to number"
  },
  RCR: {
    type: String,
    default: "",
    required: "need something"
  },
  VALID: {
    type: String,
    default: "SPS"
  },
  UTC_DATE: {
    type: Date
  },
  UTC_TIME: {
    type: String
  },
  LOCAL_TIME: {
    type: String
  },
  LATITUDE: {
    type: Number,
    required: "Latitude is needed"
  },
  NS: {
    type: String
  },
  LONGITUDE: {
    type: Number,
    required: "Longitude is needed"
  },
  EW: {
    type: String
  },
  ALTITUDE: {
    type: Number,
    required: "Altitude is needed"
  },
  SPEED: {
    type: Number,
    required: "Speed is needed"
  },
  HEADING: {
    type: Number,
    required: "Heading is needed"
  },
  GX: {
    type: Number
  },
  GY: {
    type: Number
  },
  GZ: {
    type: Number
  },
  file: {
    data: Buffer,
    contentType: String
  }
});

export default mongoose.model("GPS", GPSSchema);
