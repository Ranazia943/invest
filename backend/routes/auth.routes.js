import express from "express";
import { registerUser, loginUser, logoutUser,getAllUsers ,sendEmail,forgotPassword,resetPassword,updateProfile} from "../controllers/auth.controller.js";
import protect from '../utils/protectroute.js';

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put('/profile', protect, updateProfile);

// Reset Password route
router.post("/reset-password", resetPassword);
// Logout route
router.post("/logout", logoutUser);
router.get("/users", getAllUsers);
router.post("/send-email", sendEmail);
export default router;
