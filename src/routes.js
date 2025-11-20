const express = require("express");
const routes = express.Router();

// Importar Controllers
const UserController = require("./controllers/UserController");
const OrderController = require("./controllers/OrderController");
const ProductController = require("./controllers/ProductController");

// Importar Middlewares de Validação
const validateUser = require("./middlewares/validateUser");
const validateOrder = require("./middlewares/validateOrder");
const validateProduct = require("./middlewares/validateProduct");

// --- ROTAS DE USUÁRIOS ---
routes.post("/users", validateUser, UserController.create);
routes.get("/users", UserController.getAll);
routes.get("/users/:id", UserController.getById);
routes.put("/users/:id", validateUser, UserController.update);
routes.delete("/users/:id", UserController.delete);
// --- ROTAS ORDERS ---
routes.post("/orders", validateOrder, OrderController.create);
routes.get("/orders", OrderController.getAll);
routes.get("/orders/:id", OrderController.getById);
routes.put("/orders/:id", validateOrder, OrderController.update);
routes.delete("/orders/:id", OrderController.delete);
// --- ROTAS DE PRODUTOS ---
routes.post("/products", validateProduct, ProductController.create);
routes.get("/products", ProductController.getAll);
routes.get("/products/:id", ProductController.getById);
routes.put("/products/:id", validateProduct, ProductController.update);
routes.delete("/products/:id", ProductController.delete);
module.exports = routes;
