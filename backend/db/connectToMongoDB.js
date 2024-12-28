import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectToMongoDB = async () => {
  try {
    const dbURL = process.env.DB_LOCAL_URL; // Fetch DB URL from .env
    await mongoose.connect(dbURL, {
     
    });
    console.log("DB connection established on host:", mongoose.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
