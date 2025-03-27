import { Router } from "express";
import productRoute from "./productRoute.js";
import signUpRoute from "./signUpRoute.js";
import loginRoute from "./loginRoute.js";
import logoutRoute from "./logoutRoute.js";
import dashboardRoute from "./dashboardRoute.js";
import serviceRequestRoute from "./serviceRequestRoute.js";

const router = Router();

// The home page route
router.get("/", async (req, res) => {
  res.render("index", {
    title: "Home Page",
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
router.use("/logout", logoutRoute);

// Dashboard Routes
router.use("/dashboard", dashboardRoute);

// Service Request Routes
router.use("/service-request", serviceRequestRoute);

export default router;
