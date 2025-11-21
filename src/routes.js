const express = require("express");
const routes = express.Router();

// Importar Controllers
const UserController = require("./controllers/UserController");
const OrderController = require("./controllers/OrderController");
const ProductController = require("./controllers/ProductController");
const CategoryController = require("./controllers/categoryController");

// Importar Middlewares de Validação
const validateUser = require("./middlewares/validateUser");
const validateOrder = require("./middlewares/validateOrder");
const validateProduct = require("./middlewares/validateProduct");
const validateCategory = require("./middlewares/validateCategory");

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
// --- ROTAS DE CATEGORIAS ---
routes.post("/products", validateCategory, CategoryController.create);
routes.get("/products", CategoryController.getAll);
routes.get("/products/:id", CategoryController.getById);
routes.put("/products/:id", validateCategory, CategoryController.update);
routes.delete("/products/:id", CategoryController.delete);
module.exports = routes;
