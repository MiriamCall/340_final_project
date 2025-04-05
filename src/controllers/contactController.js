// contactController.js

export const renderContactPage = (req, res) => {
  res.render("contact", {
    title: "Contact",
    errors: {},
    user: req.session.userId ? { id: req.session.userId } : null,
  });
};
