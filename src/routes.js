const express = require("express");
const routes = express.Router();

// Importar Controllers
const UserController = require("./controllers/UserController");
const OrderController = require("./controllers/OrderController");

// Importar Middlewares de Validação
const validateUser = require("./middlewares/validateUser");
const validateOrder = require("./middlewares/validateOrder");

// --- ROTAS DE USUÁRIOS ---
routes.post("/users", validateUser, UserController.create);
routes.get("/users", UserController.getAll);
routes.get("/users/:id", UserController.getById);
routes.put("/users/:id", validateUser, UserController.update);
routes.delete("/users/:id", UserController.delete);
// --- ROTAS ORDERS ---
routes.post("/orders", validateOrder, OrderController.create); // Com validação
routes.get("/orders", OrderController.getAll);
routes.get("/orders/:id", OrderController.getById);
routes.put("/orders/:id", validateOrder, OrderController.update); // Com validação
routes.delete("/orders/:id", OrderController.delete);
module.exports = routes;
