// controller/fetchreportController.js
import { FetchReport } from "../models/fetchreportSchema.js";

export const getReports = async (req, res) => {
  try {
    const reports = await FetchReport.find().sort({ submittedAt: -1 }); // Get all reports sorted by submission time (latest first)
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, message: "Failed to fetch reports" });
  }
};
