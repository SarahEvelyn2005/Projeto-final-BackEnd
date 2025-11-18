const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Garante que não existam emails repetidos
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "seller"], // Tipos de usuário permitidos
      default: "customer",
    },
  },
  { timestamps: true }
); // Cria createdAt e updatedAt automaticamente

module.exports = mongoose.model("User", userSchema);
