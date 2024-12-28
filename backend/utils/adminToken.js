import jwt from "jsonwebtoken";

const generateAdminTokenAndSetCookie = (adminId, res) => {
  try {
    if (!adminId) {
      throw new Error("Admin ID is required");
    }

    const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("adminJwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ message: "Error generating token" });
    throw new Error("Error generating token");
  }
};

export default generateAdminTokenAndSetCookie;
