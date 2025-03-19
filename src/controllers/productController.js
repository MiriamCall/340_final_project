import {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";

const renderProductPage = async (req, res) => {
  try {
    const result = await getAllProducts();
    const products = result.rows;

    res.render("products", { title: "Product Page", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

const renderProductDetail = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await getProductById(productId);

    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.render("productDetail", {
      title: "Product Details",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).send("Internal Server Error");
  }
};

const renderAddProductForm = (req, res) => {
  res.render("addProduct", { title: "Add Product" });
};

const addProductHandler = async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image_url: req.body.image_url,
    };

    const result = await addNewProduct(productData);

    if (result.rows.length > 0) {
      // Redirect to the new product's detail page
      res.redirect(`/products/${result.rows[0].id}`);
    } else {
      res.status(500).send("Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const renderEditProductForm = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await getProductById(productId);

    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.render("editProduct", {
      title: "Edit Product",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching product for edit:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image_url: req.body.image_url,
    };

    const result = await updateProduct(productId, productData);

    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.redirect(`/products/${productId}`);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await deleteProduct(productId);

    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.redirect("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  renderProductPage,
  renderProductDetail,
  renderAddProductForm,
  addProductHandler,
  renderEditProductForm,
  updateProductHandler,
  deleteProductHandler,
};
