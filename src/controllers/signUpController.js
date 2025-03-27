import {
  createUser,
  findUserByUsername,
  findUserByEmail,
} from "../models/userModel.js";

export const renderSignUpPage = (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    errors: {},
    user: req.session.userId ? { id: req.session.userId } : null,
  });
};

export const handleSignUp = async (req, res) => {
  const { username, password, email, roleId } = req.body;
  const errors = {};

  // Validation
  if (!username) errors.username = "Username is required";
  if (!password) errors.password = "Password is required";
  if (!email) errors.email = "Email is required";

  const existingUsername = await findUserByUsername(username);
  const existingEmail = await findUserByEmail(email);

  if (existingUsername) errors.username = "Username already exists";
  if (existingEmail) errors.email = "Email already exists";

  if (Object.keys(errors).length > 0) {
    return res.render("signup", {
      title: "Sign Up",
      errors,
      user: req.session.userId ? { id: req.session.userId } : null,
    });
  }

  try {
    const newUser = await createUser(username, password, email, roleId);
    req.session.userId = newUser.id;
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Signup failed");
  }
};
