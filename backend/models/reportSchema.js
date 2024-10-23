// models/reportSchema.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  report: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Report", reportSchema);
