import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { HTTP_STATUS } from "../config/constants.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findByEmail(email);
    if (existing)
      return res
        .status(HTTP_STATUS.CONFLICT)
        .json({ message: "Email already registered" });
    const hash = await bcrypt.hash(password, 10);
    const userId = await User.create({ username, email, password_hash: hash });
    const token = generateToken(userId);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ token, user: { userId, username, email } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user)
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    const token = generateToken(user.user_id);
    res.json({
      token,
      user: {
        userId: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
