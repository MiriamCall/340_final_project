export const handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      res.status(500).send("Logout failed");
    } else {
      res.redirect("/");
    }
  });
};
