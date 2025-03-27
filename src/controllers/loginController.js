import { findUserByUsername } from "../models/userModel.js"; // Adjust path if needed
import bcrypt from "bcrypt";

export const renderLoginPage = (req, res) => {
  res.render("login", {
    title: "Login",
    errors: {},
    user: req.session.userId ? { id: req.session.userId } : null,
  });
};

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = {};

  if (!username) errors.username = "Username is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return res.render("login", {
      title: "Login",
      errors,
      user: req.session.userId ? { id: req.session.userId } : null,
    });
  }

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      errors.login = "Invalid username or password";
      return res.render("login", {
        title: "Login",
        errors,
        user: req.session.userId ? { id: req.session.userId } : null,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      errors.login = "Invalid username or password";
      return res.render("login", {
        title: "Login",
        errors,
        user: req.session.userId ? { id: req.session.userId } : null,
      });
    }

    req.session.userId = user.id;
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Login failed");
  }
};
