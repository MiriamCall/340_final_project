import { getAllProducts, getProductById } from "../models/productModel.js";

const renderProductPage = async (req, res) => {
  try {
    const result = await getAllProducts();
    const products = result.rows;

    res.render("productOverview", { title: "Product Page", products });
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

export { renderProductPage, renderProductDetail };
