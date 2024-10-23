import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate admin users
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken; // Check for admin token
  if (!token) {
    return next(new ErrorHandler("Admin user is not authenticated!", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
  }
  next();
});

// Middleware to authenticate patient users
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken; // Check for patient token
  if (!token) {
    return next(new ErrorHandler("Patient user is not authenticated!", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Patient") {
    return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
  }
  next();
});

// Middleware to authenticate doctor users
export const isDoctorAuthenticated = catchAsyncErrors(async (req, res, next) => {
  console.log("Cookies received:", req.cookies);
  const token = req.cookies.patientToken; // Check for doctor token
  if (!token) {
    return next(new ErrorHandler("Doctor user is not authenticated!", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (!req.user) {
    return next(new ErrorHandler("Doctor user not found!", 404));
  }
  if (req.user.role !== "Doctor") {
    return next(new ErrorHandler("Not authorized as Doctor!", 403));
  }
  next();
});

// Middleware to authorize specific roles
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} not allowed to access this resource!`, 403));
    }
    next();
  };
};
