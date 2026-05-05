import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getProfile,
  updateProfile,
  changePassword,
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/user.controller.js";

const router = express.Router();
router.use(protect);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/change-password", changePassword);
router.get("/favorites", getFavorites);
router.post("/favorites/:cryptoId", addFavorite);
router.delete("/favorites/:cryptoId", removeFavorite);

export default router;
