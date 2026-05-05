import express from "express";
import {
  getMarketOverview,
  getCoinHistory,
  getCoinsList,
} from "../controllers/crypto.controller.js";

const router = express.Router();
router.get("/overview", getMarketOverview);
router.get("/history/:coinId", getCoinHistory);
router.get("/coins", getCoinsList);

export default router;
