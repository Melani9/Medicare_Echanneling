import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import router from "./router/reportRouter.js";
import reportRouter from "./router/fetchreportRouter.js";
import doctorRouter from "./router/fetchDoctorsRouter.js";
const app = express();
config({ path: "./config/config.env" });

// CORS setup
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
      process.env.DOCTORS_URL,
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// API routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/reports", router);
app.use("/api/v1/fetch-reports", reportRouter);
app.use("/api/v1/doctors", doctorRouter);
// Database connection
dbConnection();

// Error middleware
app.use(errorMiddleware);

export default app;
