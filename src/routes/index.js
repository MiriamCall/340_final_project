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

// Example Router
router.use("/example", exampleRoute);

export default router;
