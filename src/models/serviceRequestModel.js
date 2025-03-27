import dbClient from "./index.js";

export const findServiceRequests = async () => {
  const query = `
        SELECT *
        FROM service_requests;
    `;

  try {
    const result = await dbClient.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error finding service requests:", error);
    throw error;
  }
};

export const findServiceRequestsByUserId = async (userId) => {
  const query = `
        SELECT *
        FROM service_requests
        WHERE user_id = $1;
    `;
  const values = [userId];

  try {
    const result = await dbClient.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error finding service requests by user ID:", error);
    throw error;
  }
};

export const findServiceRequestById = async (requestId) => {
  const query = `
        SELECT *
        FROM service_requests
        WHERE id = $1;
    `;
  const values = [requestId];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding service request by ID:", error);
    throw error;
  }
};

export const createServiceRequest = async (requestData) => {
  const { user_id, product_id, description, status_id, technician_id } =
    requestData;
  const query = `
        INSERT INTO service_requests (user_id, product_id, description, status_id, technician_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING *;
    `;
  const values = [user_id, product_id, description, status_id, technician_id];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating service request:", error);
    throw error;
  }
};

export const updateServiceRequest = async (requestId, requestData) => {
  const { product_id, description, status_id, technician_id } = requestData;
  const query = `
        UPDATE service_requests
        SET product_id = $1, description = $2, status_id = $3, technician_id = $4, updated_at = NOW()
        WHERE id = $5
        RETURNING *;
    `;
  const values = [product_id, description, status_id, technician_id, requestId];

  try {
    const result = await dbClient.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating service request:", error);
    throw error;
  }
};

export const deleteServiceRequest = async (requestId) => {
  const query = `
        DELETE FROM service_requests
        WHERE id = $1;
    `;
  const values = [requestId];

  try {
    await dbClient.query(query, values);
  } catch (error) {
    console.error("Error deleting service request:", error);
    throw error;
  }
};
