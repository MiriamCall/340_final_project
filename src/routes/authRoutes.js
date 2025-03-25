import express from "express";
import {
  loginPage,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Login page
router.get("/login", loginPage);
router.post("/login", loginUser);

// Dashboard (protected)
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send(`Welcome, ${req.session.email}! <a href="/logout">Logout</a>`);
});

// Logout
router.get("/logout", logoutUser);

export default router;
