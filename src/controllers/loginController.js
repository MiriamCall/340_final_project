// Render the login page
export const renderLoginPage = (req, res) => {
  res.render("login", {
    title: "Login",
    user: req.session.userId ? { id: req.session.userId } : null,
  });
};

// Handle user login
export const loginUser = async (req, res) => {
  // const { email, password } = req.body;
  // try {
  //   const user = await findUserByEmail(email);
  //   if (!user) {
  //     return res.status(400).send("Invalid email or password");
  //   }
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) {
  //     return res.status(400).send("Invalid email or password");
  //   }
  //   // Store user information in the session
  //   req.session.userId = user.id;
  //   req.session.email = user.email;
  //   res.redirect("/dashboard");
  // } catch (error) {
  //   console.error("Login error:", error);
  //   res.status(500).send("Internal Server Error");
  // }
};

// Handle user logout
// export const logoutUser = (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/login");
//   });
// };
