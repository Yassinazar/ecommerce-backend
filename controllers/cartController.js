const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ApiError = require("../services/ApiError");

// POST /api/carts
// Creates a new, empty cart. Items get added to it afterwards.
const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create({ items: [] });
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

// GET /api/carts/:id
// Fetches a cart by id and populates each item's product reference so
// the response includes full product details, not just the id.
const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("items.product");

    if (!cart) {
      return next(new ApiError(404, "Cart not found"));
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// POST /api/carts/:id/items
// Adds an item (product reference + quantity) to an existing cart.
// If the product is already in the cart, its quantity is increased
// instead of creating a duplicate entry.
const addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return next(new ApiError(400, "productId is required"));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ApiError(404, "Product not found"));
    }

    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return next(new ApiError(404, "Cart not found"));
    }

    const qty = quantity && quantity > 0 ? quantity : 1;

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ product: productId, quantity: qty });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  getCartById,
  addItemToCart,
};
