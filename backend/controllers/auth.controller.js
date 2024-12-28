import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { nanoid } from "nanoid"; // For unique referral codes
import nodemailer from "nodemailer";
import crypto from "crypto";


export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, referredBy } = req.body;

    // Input validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique referral code for new user
    const referralCode = nanoid(10);

    // Validate referredBy if provided
    let referredById = null;
    if (referredBy) {
      // Find the user by referral code
      const referrer = await User.findOne({ referralCode: referredBy });
      if (!referrer) {
        return res.status(400).json({ message: "Invalid referral code" });
      }
      referredById = referrer._id;

      // Create new user with the referral code and referrer info
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        referralCode,
        referredBy: referredById,
      });

      // Save the new user first to get the user ID
      const savedUser = await newUser.save();

      // Update the referrer's referrals array to include the new user ID
      referrer.referrals.push(savedUser._id);
      await referrer.save();

      // Generate token and set it in a cookie
      generateTokenAndSetCookie(savedUser._id, res);

      // Return response
      return res.status(201).json({ message: "User registered successfully", user: savedUser });
    }

    // If no referral code is provided, just create the new user without referral logic
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      referralCode,
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Generate token and set it in a cookie
    generateTokenAndSetCookie(savedUser._id, res);

    // Return response
    return res.status(201).json({ message: "User registered successfully", user: savedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  const { username, email, password, confirmPassword, image } = req.body;
  
  // Check if req.user exists, it should have been added by the protect middleware
  if (!req.user) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const userId = req.user.id; // Extract user ID from the decoded JWT
  
  try {
    // Find the user to update
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate email
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      user.email = email;
    }

    // Validate username
    if (username && username !== user.username) {
      user.username = username;
    }

    // Validate password (check if new password matches confirm password)
    if (password && confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password) {
      // Hash the new password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Handle image update (image URL passed from frontend)
    if (image !== undefined) { // If the image is provided, update it
      user.image = image;
    }

    // Save the updated user
    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateTokenAndSetCookie(user._id, res); // token is set in a cookie here

    // Return the token in the response body
    res.status(200).json({ message: "Login successful", user, token }); // Include token in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Logout User
export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear the cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Configure nodemailer transporter with Hostinger's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Hostinger SMTP server
  port: 465,                  // Port for SSL connection
  secure: true,               // Use SSL
  auth: {
    user: 'support@goldmine3x.com', // Your email address
    pass: 'Syed@1280',             // Your email password or app password
  },
});

// Send Email Function
export const sendEmail = async (req, res) => {
  try {
    const { userId, subject, message } = req.body;

    // Validate input fields
    if (!userId || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use Nodemailer to send the email
    await transporter.sendMail({
      from: '"goldmine3x" <support@goldmine3x.com>', // Admin email
      to: user.email, // Recipient email (user's email)
      subject, // Email subject
      text: `Hello ${user.username} :\n\n${message}\n\nReply to: support@goldmine3x.com`, // Email body with username
    });

    res.status(200).json({ message: "Email sent successfully to " + user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users with username and email fields
    const users = await User.find({}, "username email");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};



// Forgot Password: Request Reset Email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token and expiration time
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpire = Date.now() + 3600000; // 1 hour

    // Set the reset token and expiration in the user model
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetPasswordExpire;

    // Save the user with the new reset token and expiration
    await user.save();

    // Send reset email
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: '"goldmine3x" <support@goldmine3x.com>',
      to: user.email,
      subject: "Password Reset Request",
      text: `Hello ${user.username},\n\nYou requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    // Validate input
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpire = undefined; // Clear the expiration time
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
