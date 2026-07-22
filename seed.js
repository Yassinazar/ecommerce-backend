require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const sampleProducts = require("./data/sampleProducts");

// Connects to the database, clears any existing product data, inserts
// the sample records, then closes the connection. This gives a clean,
// predictable database state every time it runs.
const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("Existing products cleared");

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`${inserted.length} sample products inserted successfully`);

    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
