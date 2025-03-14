import { Router } from "express";

const router = Router();

const express = require("express");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// PostgreSQL client setup
const client = new Client({
  user: "yourUsername", // replace with your db username
  host: "localhost",
  database: "yourDatabase", // replace with your db name
  password: "yourPassword", // replace with your db password
  port: 5432, // default PostgreSQL port
});

client.connect();

// Route to add a dress
app.post("/api/dresses", async (req, res) => {
  const { name, description, price, image_url, category, size, color } =
    req.body;

  if (!name || !price || !category || !size || !color) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query =
      "INSERT INTO dresses (name, description, price, image_url, category, size, color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [name, description, price, image_url, category, size, color];

    const result = await client.query(query, values);
    res
      .status(201)
      .json({ message: "Dress added successfully", dress: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving dress" });
  }
});

// Route to get all dresses
app.get("/api/dresses", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM dresses");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dresses" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
