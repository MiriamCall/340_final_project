import { Router } from "express";
import { renderContactPage } from "../controllers/contactController.js";

const router = Router();

router.get("/", renderContactPage);

export default router;
