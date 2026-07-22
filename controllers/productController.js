const Product = require("../models/Product");
const ApiError = require("../services/ApiError");

// GET /api/products
// Fetches every product in the catalog.
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
// Fetches a single product by its id.
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ApiError(404, "Product not found"));
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// POST /api/products
// Creates a new product. Mongoose validation (required fields, types,
// min values) runs automatically and rejects bad input before it ever
// reaches the database.
const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category, image } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
// Updates an existing product with new values.
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new ApiError(404, "Product not found"));
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
// Removes a product from the catalog.
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ApiError(404, "Product not found"));
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
