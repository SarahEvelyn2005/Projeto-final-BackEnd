const mongoose = require("mongoose");
const CuponsSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true }, // Ex: 10 para 10%
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cupons", CuponsSchema);
