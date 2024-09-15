/*// router/userRouter.js
import express from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logout, patientRegister } from "../controller/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAuthenticated, isAuthorized('Admin'), addNewAdmin);
router.post("/doctor/addnew", isAuthenticated, isAuthorized('Admin'), addNewDoctor);
router.get("/doctors", isAuthenticated, getAllDoctors);
router.get("/me", isAuthenticated, getUserDetails);
router.get("/logout", isAuthenticated, logout);

export default router;*/

import express from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/doctors", getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router; 
