import { Router } from "express";
import {
  renderProductPage,
  renderProductDetail,
} from "../controllers/productController.js";

const router = Router();

// Route to render the product list page
router.get("/", renderProductPage);

// Route to render a single product detail page
router.get("/:id", renderProductDetail);

export default router;
