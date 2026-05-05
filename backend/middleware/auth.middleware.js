import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../config/constants.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Invalid or expired token." });
  }
};
