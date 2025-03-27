import { Router } from "express";
import productRoute from "./productRoute.js";
import signUpRoute from "./signUpRoute.js";
import loginRoute from "./loginRoute.js";
import logoutRoute from "./logoutRoute.js";
import dashboardRoute from "./dashboardRoute.js";

const router = Router();

// The home page route
router.get("/", async (req, res) => {
  res.render("index", { title: "Home Page" });
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

export default router;
