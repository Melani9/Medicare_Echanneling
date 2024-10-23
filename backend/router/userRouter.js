import express from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister,getAppointmentsCount,getDoctorsCount } from "../controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
import { logoutDoctor } from '../controller/userController.js';
import { isDoctorAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/doctors", getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/doctor/me", isDoctorAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get('/doctor/logout', isDoctorAuthenticated, logoutDoctor);
router.put('/edit-profile', isPatientAuthenticated, getUserDetails);

router.get('/appointments/count', getAppointmentsCount); // Use the function here
router.get('/doctors/count', getDoctorsCount);
export default router; 
