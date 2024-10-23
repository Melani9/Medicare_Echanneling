// controllers/reportController.js
const Report = require("../models/reportSchema");
const path = require("path");

// POST /api/v1/reports
const submitReport = async (req, res) => {
  const { report, doctor } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const newReport = new Report({
      report,
      file: req.file.path, // Store the file path
      doctor,
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit report", error: error.message });
  }
};

module.exports = {
  submitReport,
};
