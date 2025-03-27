export const renderDashboard = (req, res) => {
  if (req.session.userId) {
    res.render("dashboard", {
      title: "Dashboard",
      user: { id: req.session.userId },
    });
  } else {
    res.redirect("/login");
  }
};
