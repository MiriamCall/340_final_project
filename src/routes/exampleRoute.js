import { Router } from "express";
import {
  displayExampleText,
  displayAboutPage,
  displayApparelPage,
  displayLoginPage,
  displaySignUpPage,
  displayContactForm,
} from "../controllers/exampleController.js";

const router = Router();

// Route for the Home page
router.get("/", displayExampleText);

// Route for the About page
router.get("/about", displayAboutPage);

// Route for the Apparel page
router.get("/apparel", displayApparelPage);

// Route for the Login page
router.get("/login", displayLoginPage);

// Route for the Sign-Up page
router.get("/signup", displaySignUpPage);

// Route for the Contact form page
router.get("/contact", displayContactForm);

export default router;
