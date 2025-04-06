import { Router } from "express";
import {
  renderContactPage,
  addContactHandler,
} from "../controllers/contactController.js";

const router = Router();

router.get("/", renderContactPage);

router.post("/", addContactHandler);

export default router;
