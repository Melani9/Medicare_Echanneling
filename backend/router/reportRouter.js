// routes/reportRouter.js
const express = require("express");
const multer = require("multer");
const { submitReport } = require("../controllers/reportController");

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the extension
  },
});

const upload = multer({ storage });

// POST /api/v1/reports
router.post("/", upload.single("file"), submitReport);

module.exports = router;
