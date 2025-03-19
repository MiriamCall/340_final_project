import { Router } from "express";
import {
  renderProductPage,
  renderProductDetail,
  addProduct,
  createProduct,
} from "../controllers/productController.js";

const router = Router();

// Route to render the product list page
router.get("/", renderProductPage);

// Add product routes
router.get("/add", addProduct);

// Route to add a new product
router.post("/add", createProduct);

// Route to render a single product detail page
router.get("/:id", renderProductDetail);

export default router;
