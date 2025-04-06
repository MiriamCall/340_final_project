import { Router } from "express";
import {
  renderContactsDashboard,
  renderAddContactPage,
  addContactHandler,
  deleteContactHandler,
} from "../controllers/contactController.js";
import {
  isAuthenticated,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/dashboard",
  isAuthenticated,
  authorizeAdmin,
  renderContactsDashboard
);

router.get("/", renderAddContactPage);

router.post("/", addContactHandler);

router.post("/:id", isAuthenticated, authorizeAdmin, deleteContactHandler);

export default router;
