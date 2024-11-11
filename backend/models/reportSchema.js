// models/reportSchema.js
import mongoose from "mongoose";

// Report schema definition
const reportSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true, // Store the file path in MongoDB
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the Doctor model
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Exporting the Report model
const Report = mongoose.model("Report", reportSchema);
export default Report;
