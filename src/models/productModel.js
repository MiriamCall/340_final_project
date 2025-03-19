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

export { getProductById, getAllProducts };
