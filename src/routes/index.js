import { Router } from "express";
import productRoute from "./productRoute.js";
import userRoute from "./userRoute.js";

const router = Router();

// ^^^ CREATE NEW ROUTES AND LINK TO NEW ROUTE FILES HERE

// The home page route
router.get("/", async (req, res) => {
  res.render("index", { title: "Home Page" });
});

// Product Page Route
router.use("/product", productRoute);

// User Page Route
router.use("/user", userRoute);

// login Page Route

// dashboard Page Route

// //Apparel Page Route
// router.get("/apparel", async (req, res) => {
//   res.render("apparel", { title: "Apparel Page" });
// });

// //login Page Route
// router.get("/login", async (req, res) => {
//   res.render("login", { title: "Login Page" });
// });

// //dashboard Page Route
// router.get("/dashboard", async (req, res) => {
//   res.render("dashboard", { title: "Dashboard Page" });
// });

export default router;
