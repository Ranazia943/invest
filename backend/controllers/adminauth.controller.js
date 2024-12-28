import bcrypt from "bcryptjs";
import Admin from "../models/adminauth.model.js";
import generateAdminTokenAndSetCookie from "../utils/adminToken.js";

// Admin Login
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found!" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials!" });
      }
  
      // Generate token and set as cookie
      generateAdminTokenAndSetCookie(admin._id, res);
  
      res.status(200).json({
        message: "Login successful",
        admin: {
          id: admin._id,
          email: admin.email,
          username: admin.username,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  };
  
  // Admin Logout
  export const logoutAdmin = (req, res) => {
    res.clearCookie("adminJwt", { httpOnly: true, sameSite: "strict" });
    res.status(200).json({ message: "Logout successful" });
  };
  
  // Fetch Admin Profile
  export const getAdminProfile = async (req, res) => {
    try {
      const admin = await Admin.findById(req.admin.id).select("-password"); // Exclude password
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
  };
  
  // Create Admin
  export const createAdmin = async (req, res) => {
    const { email, username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ email, username, password: hashedPassword });
      await newAdmin.save();
  
      res.status(201).json({ message: "Admin created successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error creating admin", error: error.message });
    }
  };

// Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (username) admin.username = username;
    if (email) admin.email = email;

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();

    res.status(200).json({
      message: "Admin profile updated successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};
