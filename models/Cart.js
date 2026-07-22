const mongoose = require("mongoose");

// Each cart item references a specific Product by its ObjectId rather than
// duplicating product data. Mongoose can later populate this reference to
// pull in the full product details when a cart is fetched.
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "A cart item must reference a product"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
  },
  { _id: false }
);

// The Cart schema wraps an array of items. Timestamps are tracked
// automatically so it's possible to see when a cart was created and when
// it was last updated (useful for analytics like cart abandonment).
const cartSchema = new mongoose.Schema(
  {
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
