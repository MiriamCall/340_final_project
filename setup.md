# E-Commerce Dress Shop Web App Tutorial

## Overview

In this tutorial, we'll build a simple e-commerce dress shop website with multiple user roles. The website will include basic functionality like user registration, login, displaying dresses for sale, and handling service requests for a customer service portal. We'll also implement role-based access control (Admin, Technician, Client).

We'll be using the following technologies:

- **Backend Framework:** Node.js with Express.js
- **Template Engine:** EJS (Embedded JavaScript)
- **Database:** PostgreSQL
- **Authentication:** Express-session for session-based authentication
- **Deployment:** Render (with a PostgreSQL database)

## Folder Structure

ecommerce-dress-shop/
├── controllers/
│ ├── authController.js
│ ├── homeController.js
│ ├── productController.js
│ ├── serviceController.js
│ └── adminController.js
├── models/
│ ├── user.js
│ ├── product.js
│ ├── serviceRequest.js
│ └── role.js
├── views/
│ ├── layouts/
│ │ └── layout.ejs
│ ├── partials/
│ │ ├── header.ejs
│ │ ├── footer.ejs
│ ├── home.ejs
│ ├── about.ejs
│ ├── apparel.ejs
│ ├── login.ejs
│ ├── services.ejs
│ └── dashboard.ejs
├── public/
│ ├── css/
│ ├── js/
│ └── images/
├── routes/
│ ├── authRoutes.js
│ ├── index.js
│ ├── productRoutes.js
│ ├── serviceRoutes.js
│ └── adminRoutes.js
├── .env
├── app.js
├── package.json
└── README.md

## Step-by-Step Guide

### Step 1: Set up your project

Initialize your project:

```bash
mkdir ecommerce-dress-shop
cd ecommerce-dress-shop
npm init -y
Install dependencies:

Bash

npm install express ejs pg express-session bcryptjs dotenv
Create the necessary project files:
Create the folder structure mentioned above.

Step 2: Configure your environment
Create a .env file in the root directory to store environment variables:

Bash

touch .env
Add the following to .env:

Ini, TOML

DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
SESSION_SECRET=your_session_secret
Set up PostgreSQL database:

Create a PostgreSQL database named ecommerce_db.
Set up tables for users, products, service_requests, roles, etc.
Step 3: Set up the database models
Create models in models/ to interact with your PostgreSQL database.

models/user.js: Define user attributes (id, username, email, password, role_id).
models/product.js: Define attributes for products (id, name, description, price, image_url).
models/serviceRequest.js: Define service request attributes (id, user_id, description, status).
models/role.js: Define roles (admin, technician, client).
Step 4: Set up Express routes
routes/authRoutes.js: Define routes for user authentication (login, signup, logout).
routes/homeRoutes.js: Routes for the homepage and about page.
routes/productRoutes.js: Routes to display products (e.g., GET /apparel).
routes/serviceRoutes.js: Routes to handle service requests and view services for users.
routes/adminRoutes.js: Routes for admin to manage users, roles, and product stock.
Step 5: Implement user authentication
Login and Signup:

Use bcryptjs to hash passwords and express-session for session-based authentication. Here's a basic implementation:

controllers/authController.js:

JavaScript

import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    return res.redirect('/');
  }
  res.render('login', { error: 'Invalid email or password' });
};

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.create({ email, password: hashedPassword, username });
  req.session.user = user;
  res.redirect('/');
};
Step 6: Build the Views using EJS
views/layouts/layout.ejs: Common layout for the site (header, footer, etc.).
views/home.ejs: Homepage displaying featured dresses.
views/about.ejs: Simple about page.
views/apparel.ejs: List dresses available for purchase.
views/login.ejs: Login form.
views/services.ejs: Service request form and view services for signed-in users.
views/dashboard.ejs: Admin dashboard to manage users, products, and service requests.
Example of a basic home.ejs:

HTML

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Home - Dress Shop</title>
  </head>
  <body>
    <%- include('partials/header') %>
    <h1>Welcome to the Dress Shop</h1>
    <p>Explore our amazing collection of dresses!</p>
    <%- include('partials/footer') %>
  </body>
</html>
Step 7: Implement Role-Based Access Control
Create middleware to check the user's role (Admin, Technician, or Client) and restrict access to certain routes based on roles.

Example Middleware:

JavaScript

export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.redirect('/');
};

export const isTechnician = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'technician') {
    return next();
  }
  res.redirect('/');
};
Step 8: Implement the Admin Dashboard
controllers/adminController.js: Create routes for managing users, roles, and products.
views/admin/dashboard.ejs: Admin panel to add/edit products, assign roles, and view service requests.
Step 9: Implement Service Requests
controllers/serviceController.js: Handle service requests (create, view, and respond).
views/services.ejs: Display service request form and user’s service requests.
Step 10: Testing and Deployment
Testing: Test your website locally by running npm start.
Deployment: Deploy your application on Render (or another cloud platform). Make sure your PostgreSQL database is connected to the deployed app.
Step 11: Final Touches
Add validation for forms.
Ensure the site is responsive.
Improve UI/UX as necessary.
Conclusion
By following this guide, you'll have a basic e-commerce website with role-based access, user authentication, and a service portal for customers and technicians. The project will include all necessary features like user registration, login, product listing, and a service request system, along with an admin dashboard for managing users and content.
```

Here’s a bash script that will create the controller files for your project. The script will generate the controller files under the controllers/ directory:

bash
Copy
#!/bin/bash

# Define the controllers directory

CONTROLLERS_DIR="controllers"

# Create the controllers directory if it doesn't exist

mkdir -p $CONTROLLERS_DIR

# List of controllers to create

CONTROLLERS=(
"authController.js"
"homeController.js"
"productController.js"
"serviceController.js"
"adminController.js"
)

# Create each controller file

for CONTROLLER in "${CONTROLLERS[@]}"; do
  if [ ! -f "$CONTROLLERS_DIR/$CONTROLLER" ]; then
    echo "Creating $CONTROLLER..."
    touch "$CONTROLLERS_DIR/$CONTROLLER"
  else
    echo "$CONTROLLER already exists, skipping..."
fi
done

echo "All controllers created (or skipped if already exists)."
How to Use:
Create the script file: Save the script as create-controllers.sh in the root of your project directory.

Make the script executable: Run the following command in your terminal:

bash
Copy
chmod +x create-controllers.sh
Run the script: Execute the script to create the controller files:

bash
Copy
./create-controllers.sh
What the Script Does:
It checks if the controllers/ directory exists and creates it if necessary.
It creates the following controller files:
authController.js
homeController.js
productController.js
serviceController.js
adminController.js
If a controller file already exists, it will skip creating that file and print a message saying it already exists.
You said:
Help me do the database
ChatGPT said:
Creating the database for your e-commerce dress shop involves several steps, including designing the database schema, creating the necessary tables, and establishing relationships between them. I'll walk you through each step to help you set up your PostgreSQL database.

Step 1: Database Design
Here’s a simplified schema for your database, based on your project requirements.

Tables
users
Stores user information (e.g., name, email, password, and role).
roles
Stores user roles (e.g., admin, technician, client).
products
Stores product information (e.g., name, description, price, image URL).
service_requests
Stores service requests made by users (e.g., description, status, assigned technician).
user_service_requests
A relationship table to track the user-service request relation.
Relationships:
One-to-many between roles and users: Each user has a single role, but a role can have many users.
One-to-many between users and service_requests: Each user can have multiple service requests.
One-to-many between technicians and service_requests: Technicians are assigned service requests.
One-to-many between products and service_requests: A product can have service requests associated with it.
Step 2: Create the Database and Tables
Assuming that PostgreSQL is installed and running on your machine, follow these steps to create your database.

1. Create the Database
   Log into PostgreSQL from the terminal:

bash
Copy
psql -U postgres
Create a new database:

sql
Copy
CREATE DATABASE ecommerce_db;
Connect to the new database:

sql
Copy
\c ecommerce_db; 2. Create Tables
Now, you can create the necessary tables. Below are the SQL queries to set up each table.

Roles Table:

sql
Copy
CREATE TABLE roles (
id SERIAL PRIMARY KEY,
role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert predefined roles (Admin, Technician, Client)
INSERT INTO roles (role_name) VALUES
('admin'),
('technician'),
('client');
Users Table:

sql
Copy
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role_id INT REFERENCES roles(id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Products Table:

sql
Copy
CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
price DECIMAL(10, 2) NOT NULL,
image_url VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Service Requests Table:

sql
Copy
CREATE TABLE service_requests (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
product_id INT REFERENCES products(id) ON DELETE CASCADE,
description TEXT NOT NULL,
status VARCHAR(50) DEFAULT 'pending',
technician_id INT REFERENCES users(id), -- Technician assigned to the request
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Step 3: Create Relationship Between Users and Service Requests
To manage the relationship between users and service requests, we can use a many-to-many relationship. Here’s how you can do it.

User-Service Requests Relationship:

sql
Copy
CREATE TABLE user_service_requests (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
service_request_id INT REFERENCES service_requests(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Step 4: Set Up Data Integrity and Constraints
To enforce integrity, make sure your tables are designed with foreign keys to link the relationships.

Users have a role (via role_id).
Service Requests are linked to users (via user_id).
Service Requests are also linked to products (via product_id).
Technicians are linked to service requests (via technician_id).
Step 5: Example Insertions
Insert some example data to test your setup.

Insert Roles:

sql
Copy
INSERT INTO roles (role_name) VALUES
('admin'),
('technician'),
('client');
Insert Users:

sql
Copy
INSERT INTO users (username, email, password, role_id) VALUES
('admin', 'admin@example.com', 'hashed_password', 1), -- Admin
('tech1', 'tech1@example.com', 'hashed_password', 2), -- Technician
('client1', 'client1@example.com', 'hashed_password', 3); -- Client
Insert Products:

sql
Copy
INSERT INTO products (name, description, price, image_url) VALUES
('Dress 1', 'A beautiful dress for summer', 49.99, 'image1.jpg'),
('Dress 2', 'A stunning evening gown', 129.99, 'image2.jpg');
Insert Service Requests:

sql
Copy
INSERT INTO service_requests (user_id, product_id, description, status, technician_id) VALUES
(3, 1, 'Request to fix a tear in the fabric', 'pending', 2); -- Client requesting service
Step 6: Querying the Data
Here are some example queries:

Get all users and their roles:

sql
Copy
SELECT users.username, roles.role_name FROM users
JOIN roles ON users.role_id = roles.id;
Get all products with service requests:

sql
Copy
SELECT products.name, service_requests.description, service_requests.status FROM products
JOIN service_requests ON products.id = service_requests.product_id;
Get all service requests assigned to a technician:

sql
Copy
SELECT service_requests.description, service_requests.status, users.username AS technician
FROM service_requests
JOIN users ON service_requests.technician_id = users.id
WHERE service_requests.technician_id IS NOT NULL;
Step 7: Connect the Database to Node.js
In your Node.js app, use a package like pg (node-postgres) to connect to the PostgreSQL database.

bash
Copy
npm install pg
In your app.js (or another database configuration file), you can set up the database connection like this:

javascript
Copy
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
user: process.env.DB_USER,
host: process.env.DB_HOST,
database: process.env.DB_NAME,
password: process.env.DB_PASSWORD,
port: process.env.DB_PORT,
});

export default pool;
You can then use this pool to query the database in your controllers or models.

Step 8: Run the Application
With the database set up, you should be able to run your application, test the routes, and interact with your data.

Conclusion
This guide helps you set up the PostgreSQL database for your e-commerce dress shop project, with a basic schema for users, roles, products, and service requests. You can expand on this by adding more features like product categories, inventory management, or order history.
