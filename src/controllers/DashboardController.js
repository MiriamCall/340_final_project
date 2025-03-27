import { findUserById, getUserRole } from "../models/userModel.js";

export const renderDashboard = async (req, res) => {
  if (req.session.userId) {
    try {
      const userId = req.session.userId;
      const user = await findUserById(userId);
      const roleId = await getUserRole(userId);

      if (!user) {
        return res.redirect("/login");
      }

      console.log(req.session);
      console.log(user);

      res.render("dashboard", {
        title: "Dashboard",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roleId: roleId,
        },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/login");
  }
};
