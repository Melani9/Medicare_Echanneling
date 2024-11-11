import Report from "../models/reportSchema.js"; // Importing the Report model
import path from "path"; // To work with file paths
import fs from "fs"; // To ensure the upload directory exists


const submitReport = async (req, res) => {
  const { description, doctor } = req.body;
  const file = req.file; // Get the uploaded file from multer

  console.log("Request body:", req.body); // Log the request body
  console.log("Uploaded file:", file); // Log the uploaded file

  // Check if file is uploaded
  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    // Ensure the file is a PDF (You can also allow other formats like DOCX)
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed." });
    }

    // Check if the doctor exists (Ensure valid reference)
    if (!doctor) {
      return res.status(400).json({ message: "Doctor ID is missing." });
    }

    // Define the file path to save the file on the server
    const filePath = path.join(__dirname, "../uploads", file.filename); // Multer stores the file as `file.filename`

    // Create a new report document
    const newReport = new Report({
      description,
      file: filePath, // Store the file path in MongoDB
      doctor,
    });

    // Save the new report in MongoDB
    await newReport.save();

    // Respond with a success message
    res.status(201).json({ message: "Report submitted successfully!" });
  } catch (error) {
    console.error("Error submitting report:", error); // More detailed error log
    res.status(500).json({ message: "Failed to submit report", error: error.message });
  }
};

export { submitReport };
