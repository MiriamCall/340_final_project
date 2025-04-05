// contactController.js
import { getAllContacts, addNewContact } from "../models/contactModel.js";

const renderContactPage = async (req, res) => {
  res.render("contact", {
    title: "Contact",
    errors: {},
    user: req.session.userId ? { id: req.session.userId } : null,
  });
};

export { renderContactPage };
