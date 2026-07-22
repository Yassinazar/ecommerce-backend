const mongoose = require("mongoose");

// Establishes the connection between the Express app and the local
// MongoDB instance. The connection string lives in the .env file so it
// never needs to be hardcoded or committed to the repository.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
