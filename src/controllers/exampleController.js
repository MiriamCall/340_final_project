// controllers/exampleController.js

// Display "Home" Text to page
export const displayExampleText = async (req, res) => {
  res.send(
    "<h1>Welcome to the Dress Shop Home Page</h1><p>Explore the latest fashion trends and shop our collection of dresses!</p><a href='/about'>About</a> | <a href='/apparel'>Apparel</a> | <a href='/login'>Login</a> | <a href='/signup'>Sign Up</a>"
  );
};

// About page function
export const displayAboutPage = async (req, res) => {
  res.send(
    "<h1>About Our Dress Shop</h1><p>We offer a wide range of dresses for every occasion!</p><a href='/'>Home</a> | <a href='/apparel'>Apparel</a> | <a href='/login'>Login</a> | <a href='/signup'>Sign Up</a>"
  );
};

// Apparel page function
export const displayApparelPage = async (req, res) => {
  res.send(
    "<h1>Apparel Collection</h1><p>Browse our amazing selection of dresses for all occasions!</p><a href='/'>Home</a> | <a href='/about'>About</a> | <a href='/login'>Login</a> | <a href='/signup'>Sign Up</a>"
  );
};

// Login page function
export const displayLoginPage = async (req, res) => {
  res.send(
    "<h1>Login</h1><p>Enter your credentials to log in.</p><form action='#' method='POST'><label for='email'>Email:</label><input type='email' id='email' name='email' required><br><br><label for='password'>Password:</label><input type='password' id='password' name='password' required><br><br><button type='submit'>Login</button></form><a href='/'>Home</a> | <a href='/about'>About</a> | <a href='/apparel'>Apparel</a> | <a href='/signup'>Sign Up</a>"
  );
};

// Sign-up page function
export const displaySignUpPage = async (req, res) => {
  res.send(
    "<h1>Sign Up</h1><p>Create an account to start shopping with us!</p><form action='#' method='POST'><label for='username'>Username:</label><input type='text' id='username' name='username' required><br><br><label for='email'>Email:</label><input type='email' id='email' name='email' required><br><br><label for='password'>Password:</label><input type='password' id='password' name='password' required><br><br><button type='submit'>Sign Up</button></form><a href='/'>Home</a> | <a href='/about'>About</a> | <a href='/apparel'>Apparel</a> | <a href='/login'>Login</a>"
  );
};

// Contact form page function
export const displayContactForm = async (req, res) => {
  res.send(
    "<h1>Contact Us</h1><p>Have questions? Reach out to us below:</p><form action='#' method='POST'><label for='name'>Name:</label><input type='text' id='name' name='name' required><br><br><label for='email'>Email:</label><input type='email' id='email' name='email' required><br><br><label for='message'>Message:</label><textarea id='message' name='message' required></textarea><br><br><button type='submit'>Submit</button></form><a href='/'>Home</a> | <a href='/about'>About</a> | <a href='/apparel'>Apparel</a> | <a href='/login'>Login</a>"
  );
};
