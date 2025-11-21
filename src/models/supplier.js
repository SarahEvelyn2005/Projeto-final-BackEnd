const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  email: { type: String },
  phone: { type: String },
  address: {
    street: String,
    number: String,
    city: String,
    state: String,
    zipCode: String
  },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Supplier", SupplierSchema);
