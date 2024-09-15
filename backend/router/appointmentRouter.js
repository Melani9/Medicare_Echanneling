import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;

/*// router/appointmentRouter.js
import express from "express";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus, submitReport, getReports } from "../controller/appointmentController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized('Patient'), postAppointment);
router.get("/getall", isAuthenticated, isAuthorized('Admin'), getAllAppointments);
router.put("/update/:id", isAuthenticated, isAuthorized('Admin'), updateAppointmentStatus);
router.delete("/delete/:id", isAuthenticated, isAuthorized('Admin'), deleteAppointment);
router.post("/report/:id", isAuthenticated, isAuthorized('Patient'), submitReport);
router.get("/report/:id", isAuthenticated, isAuthorized('Patient', 'Admin'), getReports);

export default router;*/
