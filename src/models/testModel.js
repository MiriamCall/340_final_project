import dbClient from "./index.js";

const testConnection = async (id) => {
  const query = "SELECT name, description, price FROM products WHERE id = $1";
  const values = [id];
  return await dbClient.query(query, values);
};

export { testConnection };
