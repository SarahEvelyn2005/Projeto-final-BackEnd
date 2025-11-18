const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total: { type: Number, required: true },
    status: { type: String, default: "pending" }, // pending, paid, shipped
    items: [
      {
        // Array de subdocumentos simples
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
