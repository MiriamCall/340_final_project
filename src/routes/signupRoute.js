import { Router } from "express";
import {
  renderSignUpPage,
  handleSignUp,
} from "../controllers/signUpController.js";

const router = Router();

router.get("/", renderSignUpPage); // Render the signup form
router.post("/", handleSignUp); // Handle the form submission

export default router;
