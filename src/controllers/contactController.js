// contactController.js
import {
  getContactById,
  getAllContacts,
  addNewContact,
  deleteContact,
} from "../models/contactModel.js";

const renderContactsDashboard = async (req, res) => {
  try {
    const result = await getAllContacts();
    const contacts = result.rows;

    res.render("contactsDashboard", {
      title: "View Contacts",
      contacts,
      user: req.session.userId ? { id: req.session.userId } : null,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).send("Internal Server Error");
  }
};

const renderAddContactPage = async (req, res) => {
  res.render("addContact", {
    title: "Contact",
    errors: {},
    user: req.session.userId ? { id: req.session.userId } : null,
  });
};

const addContactHandler = async (req, res) => {
  try {
    const contactData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      message: req.body.message,
    };

    const result = await addNewContact(contactData);

    if (result.rows.length > 0) {
      res.redirect(`/thank-you`);
    } else {
      res.status(500).send("Error adding contact");
    }
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteContactHandler = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await deleteContact(contactId);

    if (result.rows.length === 0) {
      return res.status(404).send("Contact not found");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  renderContactsDashboard,
  renderAddContactPage,
  addContactHandler,
  deleteContactHandler,
};
