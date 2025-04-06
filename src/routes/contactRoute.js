import { Router } from "express";
import {
  renderContactsDashboard,
  renderAddContactPage,
  addContactHandler,
  deleteContactHandler,
} from "../controllers/contactController.js";

const router = Router();

router.get("/dashboard", renderContactsDashboard);

router.get("/", renderAddContactPage);

router.post("/", addContactHandler);

router.post("/:id", deleteContactHandler);

export default router;
