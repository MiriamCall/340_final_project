import { Router } from "express";
import {
  renderProductPage,
  renderProductDetail,
  renderAddProductForm,
  addProductHandler,
  renderEditProductForm,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/productController.js";

const router = Router();

// Route to render the product list page
router.get("/", renderProductPage);

// Add product routes
router.get("/add", renderAddProductForm);
router.post("/add", addProductHandler);

// Edit product routes
router.get("/edit/:id", renderEditProductForm);
router.post("/edit/:id", updateProductHandler);

// Delete product route
router.post("/delete/:id", deleteProductHandler);

// Route to render a single product detail page
// Note: Remember to put this last to avoid conflicts with other routes
router.get("/:id", renderProductDetail);

export default router;
