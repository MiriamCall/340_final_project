// contactController.js
import { getAllContacts, addNewContact } from "../models/contactModel.js";

const renderContactPage = async (req, res) => {
  res.render("contact", {
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
      res.redirect(`/contact`);
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

    res.redirect("/contact");
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { renderContactPage, addContactHandler, deleteContactHandler };
