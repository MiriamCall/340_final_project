import dbClient from "./index.js";
import bcrypt from "bcrypt";

export const createUser = async (username, password, email, roleId = 3) => {
  // Default roleId is set to 3 (client)
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

export const findUserById = async (userId) => {
  const query = "SELECT * FROM users WHERE id = $1;";
  const values = [userId];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw error;
  }
};

export const updateUser = async (userId, username, email, roleId) => {
  const query = `
    UPDATE users
    SET username = $1, email = $2, role_id = $3, updated_at = NOW()
    WHERE id = $4
    RETURNING id, username, email, role_id;
  `;
  const values = [username, email, roleId, userId];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  const query = "DELETE FROM users WHERE id = $1;";
  const values = [userId];

  try {
    await dbClient.query(query, values);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const findAllUsers = async () => {
  const query = "SELECT id, username, email, role_id FROM users;";

  try {
    const result = await dbClient.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error finding all users:", error);
    throw error;
  }
};

export const getUserRole = async (userId) => {
  const query = "SELECT role_id FROM users WHERE id = $1;";
  const values = [userId];

  try {
    const result = await dbClient.query(query, values);
    if (result.rows.length > 0) {
      return result.rows[0].role_id;
    }
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    throw error;
  }
};
