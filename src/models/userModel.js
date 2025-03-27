import dbClient from "./index.js";
import bcrypt from "bcrypt";

export const createUser = async (username, password, email, roleId = 1) => {
  // Default roleId is set to 1 (client)
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (username, password, email, role_id, created_at, updated_at)
    VALUES ($1, $2, $3, $4, NOW(), NOW())
    RETURNING id, username, email, role_id;
  `;
  const values = [username, hashedPassword, email, roleId];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  const query = "SELECT * FROM users WHERE username = $1;";
  const values = [username];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1;";
  const values = [email];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};
