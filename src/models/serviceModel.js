// src/models/serviceModel.js
import dbClient from "./index.js";

export const getAllServices = async () => {
  const query = `
    SELECT *
    FROM services;
  `;

  try {
    const result = await dbClient.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error finding all services:", error);
    throw error;
  }
};

export const getServiceById = async (serviceId) => {
  const query = `
    SELECT *
    FROM services
    WHERE id = $1;
  `;
  const values = [serviceId];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding service by ID:", error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  const { service_name, description } = serviceData; // Adjust columns as needed
  const query = `
    INSERT INTO services (service_name, description)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [service_name, description];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (serviceId, serviceData) => {
  const { service_name, description } = serviceData; // Adjust columns as needed
  const query = `
    UPDATE services
    SET service_name = $1, description = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [service_name, description, serviceId];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (serviceId) => {
  const query = `
    DELETE FROM services
    WHERE id = $1;
  `;
  const values = [serviceId];

  try {
    await dbClient.query(query, values);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
