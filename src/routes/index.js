import { Router } from "express";
import productRoute from "./productRoute.js";
import signUpRoute from "./signUpRoute.js";
import loginRoute from "./loginRoute.js";
import logoutRoute from "./logoutRoute.js";
import dashboardRoute from "./dashboardRoute.js";
import serviceRequestRoute from "./serviceRequestRoute.js";
import contactRoute from "./contactRoute.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

// The home page route
router.get("/", async (req, res) => {
  res.render("index", {
    title: "Home Page",
    user: req.session.userId ? { id: req.session.userId } : null,
  });
});

// Generic Thank You page (for all form submissions)
router.get("/thank-you", isAuthenticated, (req, res) => {
  res.render("thank-you", {
    title: "Thank You",
    user: req.session.userId ? { id: req.session.userId } : null,
  });
});

// Product Page Route
router.use("/products", productRoute);

// signup Routes
router.use("/signup", signUpRoute);

// login Routes
router.use("/login", loginRoute);

// Logout Routes
router.use("/logout", isAuthenticated, logoutRoute);

// Dashboard Routes
router.use("/dashboard", isAuthenticated, dashboardRoute);

// Service Request Routes
router.use("/service-request", isAuthenticated, serviceRequestRoute);

//contact route
router.use("/contact", contactRoute);

export default router;
