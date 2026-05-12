import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import passport from "../services/google.service.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
// Google Auth endpoint
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.user_id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Redirect to frontend with token as query param
    res.redirect(`${process.env.FRONTEND_URL}/oauth-redirect?token=${token}`);
  }
);

export default router;
