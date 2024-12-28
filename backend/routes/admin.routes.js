import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  getAdminProfile, // Import the profile fetching function
  createAdmin  ,updateAdminProfile     // Import the create admin function
} from "./../controllers/adminauth.controller.js";

const router = express.Router();

// Admin login route
router.post("/login", loginAdmin);

// Admin logout route
router.post("/logout", logoutAdmin);

// Admin profile route (protected)
router.get("/profile", getAdminProfile);

// Create admin route
router.post("/create", createAdmin);
router.put("/update", updateAdminProfile);

export default router;
