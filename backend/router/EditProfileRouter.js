import express from "express";
import { isPatientAuthenticated } from "../middlewares/authMiddleware.js";
import { editProfileController } from "../controller/EditProfileController.js";

const router = express.Router();

// Use the authentication middleware to protect the edit profile route
router.put('/edit-profile', isAuthenticated, upload.single('profileImage'), validateSchema(editProfileSchema), updateProfile);


export default router;

