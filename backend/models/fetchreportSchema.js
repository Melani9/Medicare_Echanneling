// models/fetchreportSchema.js
import mongoose from "mongoose";

const fetchreportSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reportUrl: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export const FetchReport = mongoose.model("FetchReport", fetchreportSchema);
