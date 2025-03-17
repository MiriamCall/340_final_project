import { Router } from "express";
import exampleRoute from "./exampleRoute.js";

const router = Router();

// ^^^ CREATE NEW ROUTES AND LINK TO NEW ROUTE FILES HERE

// The home page route
router.get("/", async (req, res) => {
  res.render("index", { title: "Home Page" });
});

//Product Page Route
router.get("/product", async (req, res) => {
  res.render("product", { title: "Product Page" });
});

//login Page Route
router.get("/login", async (req, res) => {
  res.render("login", { title: "Login Page" });
});

//dashboard Page Route
router.get("/dashboard", async (req, res) => {
  res.render("dashboard", { title: "Dashboard Page" });
});


// Example Router
router.use("/example", exampleRoute);

export default router;
