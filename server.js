/**
 * Imports
 */
import configNodeEnv from "./src/middleware/node-env.js";
import express from "express";
import fileUploads from "./src/middleware/file-uploads.js";
import homeRoute from "./src/routes/index.js";
import layouts from "./src/middleware/layouts.js";
import path from "path";
import { configureStaticPaths } from "./src/utils/index.js";
import { fileURLToPath } from "url";
import { testDatabase } from "./src/models/index.js";
import authRoutes from "./src/routes/loginRoute.js"; // ✅ Importing login routes
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import pgSession from "connect-pg-simple"; // Import for PostgreSQL session store
import pg from "pg"; // Import pg for database connection

/**
 * Global Variables
 */
dotenv.config(); // Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mode = process.env.NODE_ENV;
const port = process.env.PORT;

/**
 * Create and configure the Express server
 */
const app = express();

// Set up user session management with PostgreSQL session store
const PostgresStore = pgSession(session);
app.use(
  session({
    store: new PostgresStore({
      pool: new pg.Pool({ connectionString: process.env.DB_URL }), // Use your database connection string
      tableName: "sessions",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET, // Ensure SESSION_SECRET is set in .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Change to true if using HTTPS
  })
);

// Configure the application based on environment settings
app.use(configNodeEnv);

// Configure static paths (public directories) for the Express application
configureStaticPaths(app);

// Set EJS as the view engine and configure views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Set Layouts middleware
app.set("layout default", "default");
app.set("layouts", path.join(__dirname, "src/views/layouts"));
app.use(layouts);

// Middleware for parsing request bodies and cookies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Middleware to process multipart form data with file uploads
app.use(fileUploads);

// Primary route for home
app.use("/", homeRoute);

// Add login Routes.
app.use("/login", authRoutes);

/**
 * Start the server
 */

// Enable WebSocket server for live reloading (in dev mode)
if (mode.includes("dev")) {
  const ws = await import("ws");
  try {
    const wsPort = parseInt(port) + 1;
    const wsServer = new ws.WebSocketServer({ port: wsPort });

    wsServer.on("listening", () => {
      console.log(`WebSocket server is running on port ${wsPort}`);
    });

    wsServer.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });
  } catch (error) {
    console.error("Failed to start WebSocket server:", error);
  }
}

// Start the Express server and test database connection
app.listen(port, async () => {
  await testDatabase();
  console.log(`Server running on http://127.0.0.1:${port}`);
});
