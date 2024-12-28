import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true, // Ensure it's only accessible via HTTP requests
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    });

    // Return token if you need to send it to the client as well
    // (optional since it's already in the cookie)
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ message: "Error generating token" });
    throw new Error("Error generating token");
  }
};

export default generateTokenAndSetCookie;
