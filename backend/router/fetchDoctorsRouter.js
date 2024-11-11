// router/fetchDoctorsRouter.js
import express from "express";
import { fetchDoctors } from "../controller/fetchDoctorsController.js";

const router = express.Router();

router.get("/doctors", fetchDoctors);

export default router;
