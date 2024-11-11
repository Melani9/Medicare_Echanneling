import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url'; // Import for ES modules

// Get current directory using ES module method
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the upload directory
    const uploadDir = path.join(__dirname, "../uploads"); // Now this works
    cb(null, uploadDir); // Save to uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filename with timestamp
  },
});

const upload = multer({ storage });

// Define the route for submitting the report
router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Your logic for handling the file upload and other data
    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error: error.message });
  }
});

export default router;
