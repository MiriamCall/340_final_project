import dbClient from "./index.js";

const getContactById = async (id) => {
  const query = "SELECT * FROM contacts WHERE id = $1";
  const values = [id];
  return await dbClient.query(query, values);
};

const getAllContacts = async () => {
  const query = "SELECT * FROM contacts ORDER BY created_at DESC";
  return await dbClient.query(query);
};

const addNewContact = async (contactData) => {
  const query = `
        INSERT INTO contacts (first_name, last_name, email, message)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
  const values = [
    contactData.first_name,
    contactData.last_name,
    contactData.email,
    contactData.message,
  ];

  return await dbClient.query(query, values);
};

const deleteContact = async (id) => {
  const query = "DELETE FROM contacts WHERE id = $1 RETURNING *";
  const values = [id];
  return await dbClient.query(query, values);
};

export { getContactById, getAllContacts, addNewContact, deleteContact };
