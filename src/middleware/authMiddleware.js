// middleware/authMiddleware.js
import { findUserById } from "../models/userModel.js";

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next(); // User is authenticated, proceed
  }
  res.redirect("/login"); // Redirect to login if not authenticated
};

const authorizeAdmin = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login"); // Not authenticated
  }

  try {
    const user = await findUserById(req.session.userId);

    if (user && user.role_id === 1) {
      return next(); // User is an Admin
    } else {
      return res.status(403).send("Unauthorized"); // Forbidden
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const authorizeTechnician = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login"); // Not authenticated
  }

  try {
    const user = await findUserById(req.session.userId);

    if ((user && user.role_id === 2) || user.role_id === 1) {
      return next(); // User is a Technician or Admin
    } else {
      return res.status(403).send("Unauthorized"); // Forbidden
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const authorizeClient = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login"); // Not authenticated
  }

  try {
    const user = await findUserById(req.session.userId);

    if ((user && user.role_id === 3) || user.role_id === 1) {
      return next(); // User is a Client or Admin
    } else {
      return res.status(403).send("Unauthorized"); // Forbidden
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export {
  isAuthenticated,
  authorizeAdmin,
  authorizeTechnician,
  authorizeClient,
};
