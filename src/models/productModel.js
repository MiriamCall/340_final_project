import dbClient from "./index.js";

const getProductById = async (id) => {
  const query = "SELECT * FROM products WHERE id = $1";
  const values = [id];
  return await dbClient.query(query, values);
};

const getAllProducts = async () => {
  const query = "SELECT * FROM products";
  return await dbClient.query(query);
};

const addNewProduct = async (productData) => {
  const query = `
    INSERT INTO products (name, description, price, image_url)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [
    productData.name,
    productData.description,
    productData.price,
    productData.image_url,
  ];

  return await dbClient.query(query, values);
};

export { getProductById, getAllProducts, addNewProduct };
