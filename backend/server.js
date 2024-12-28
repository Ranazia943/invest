import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors
import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import plan from "./routes/plan.routes.js";
import purchase  from "./routes/purchase.route.js"
import withdrawl from "./routes/Withdrawl.routes.js"
import support from "./routes/support.routes.js"
import data from "./routes/totaldata.routes.js"
import adminRoutes from './routes/admin.routes.js'
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this frontend origin
    credentials: true, // Include cookies in requests
  })
);

// Add your routes and other middleware
app.use("/api/auth", authRoutes);
app.use("/api/plan", plan);
app.use("/api/userplan", purchase)
app.use("/api/withdrawl", withdrawl)
app.use("/api/support", support)
app.use("/api/data",data)
app.use("/api/admin", adminRoutes);

// Example route for logging visitors
app.get("/", (req, res) => {
  res.send("Welcome to the website!");
});

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB. Server not started.", err.message);
  });
