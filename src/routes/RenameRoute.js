import { Router } from "express";
import { renderDashboard } from "../controllers/dashboardController.js";
import {
  isAuthenticated,
  authorizeAdmin,
  authorizeTechnician,
  authorizeClient,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", renderDashboard);

export default router;
