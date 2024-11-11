// router/fetchreportRouter.js
import express from "express";
import { getReports } from "../controller/fetchreportController.js";

const router = express.Router();

// Route to get all reports
router.get("/", getReports);

export default router;
