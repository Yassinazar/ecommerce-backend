const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ApiError = require("../services/ApiError");

const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create({ items: [] });
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

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
