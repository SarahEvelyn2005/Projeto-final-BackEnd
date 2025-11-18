const express = require("express");
const routes = express.Router();

// Importar Controllers
const UserController = require("./controllers/UserController");

// Importar Middlewares de Validação
const validateUser = require("./middlewares/validateUser");

// --- ROTAS DE USUÁRIOS ---
routes.post("/users", validateUser, UserController.create);
routes.get("/users", UserController.getAll);
routes.get("/users/:id", UserController.getById);
routes.put("/users/:id", validateUser, UserController.update);
routes.delete("/users/:id", UserController.delete);

module.exports = routes;
