import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { UserFavorite } from "../models/UserFavorite.model.js";
import { HTTP_STATUS } from "../config/constants.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    await User.updateProfile(req.user.id, { username, email });
    res.json({ message: "Profile updated" });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid)
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Current password incorrect" });
    const newHash = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(req.user.id, newHash);
    res.json({ message: "Password changed" });
  } catch (err) {
    next(err);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    await UserFavorite.add(req.user.id, req.params.cryptoId);
    res.json({ message: "Added to favorites" });
  } catch (err) {
    next(err);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    await UserFavorite.remove(req.user.id, req.params.cryptoId);
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    next(err);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await UserFavorite.findByUser(req.user.id);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};
