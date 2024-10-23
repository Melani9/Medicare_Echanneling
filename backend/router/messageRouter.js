import express from "express";
import {getAllMessages, sendMessage} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);

export default router;

/*import express from "express";
import {getAllMessages, sendMessage} from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAuthenticated, getAllMessages);

export default router;
*/