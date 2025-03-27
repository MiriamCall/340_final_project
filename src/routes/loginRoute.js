import { Router } from "express";
import {
  renderLoginPage,
  handleLogin,
} from "../controllers/loginController.js";

const router = Router();

router.get("/", renderLoginPage);
router.post("/", handleLogin);

export default router;
