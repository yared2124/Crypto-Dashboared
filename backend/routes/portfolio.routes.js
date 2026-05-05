import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getPortfolio,
  addTransaction,
} from "../controllers/portfolio.controller.js";

const router = express.Router();
router.use(protect);
router.get("/", getPortfolio);
router.post("/transaction", addTransaction);

export default router;
