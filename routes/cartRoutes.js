const express = require("express");
const router = express.Router();
const {
  createCart,
  getCartById,
  addItemToCart,
} = require("../controllers/cartController");

router.post("/", createCart);
router.get("/:id", getCartById);
router.post("/:id/items", addItemToCart);

module.exports = router;
