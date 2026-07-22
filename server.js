require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB before the server starts accepting requests.
connectDB();

// Core middleware
app.use(cors());
app.use(express.json());

// Simple health check root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "eCommerce backend API is running" });
});

// Route mounting
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

// Catch-all for unknown routes
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Central error middleware must be registered last, below all routes,
// so it catches everything that happens before it.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
