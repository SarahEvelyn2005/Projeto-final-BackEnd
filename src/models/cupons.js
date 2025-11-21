const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true
    },
    discount: {
      type: Number,
      required: true,
      min: 1,
      max: 90
    },
    expiresAt: {
      type: Date,
      required: true
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", CouponSchema);
