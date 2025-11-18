const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    method: { type: String, required: true }, // pix, card, boleto
    amount: { type: Number, required: true },
    status: { type: String, default: "paid" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Payment", PaymentSchema);
