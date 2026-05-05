import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createAlert,
  getUserAlerts,
  deleteAlert,
} from "../controllers/alert.controller.js";

const router = express.Router();
router.use(protect);
router.post("/", createAlert);
router.get("/", getUserAlerts);
router.delete("/:alertId", deleteAlert);

export default router;
