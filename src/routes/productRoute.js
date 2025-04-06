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
import {
  isAuthenticated,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = Router();

// Route to render the product list page
router.get("/", renderProductPage);

// Add product routes
router.get("/add", isAuthenticated, authorizeAdmin, renderAddProductForm);
router.post("/add", isAuthenticated, authorizeAdmin, addProductHandler);

// Edit product routes
router.get("/edit/:id", isAuthenticated, authorizeAdmin, renderEditProductForm);
router.post("/edit/:id", isAuthenticated, authorizeAdmin, updateProductHandler);

// Delete product route
router.post(
  "/delete/:id",
  isAuthenticated,
  authorizeAdmin,
  deleteProductHandler
);

// Route to render a single product detail page
// Note: Remember to put this last to avoid conflicts with other routes
router.get("/:id", renderProductDetail);

export default router;
