const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String },
    district: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: {
      type: String,
      match: [/^\d{8}$/, "CEP inválido"]
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
