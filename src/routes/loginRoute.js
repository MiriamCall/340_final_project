import express from "express";
import { renderLoginPage, loginUser } from "../controllers/loginController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Login page
router.get("/", renderLoginPage);
router.post("/", loginUser);

export default router;
