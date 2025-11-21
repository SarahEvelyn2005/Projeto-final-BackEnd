const express = require("express");
const routes = express.Router();

// Importar Controllers
const UserController = require("./controllers/UserController");
const OrderController = require("./controllers/OrderController");
const ProductController = require("./controllers/ProductController");
const CategoryController = require("./controllers/CategoryController");
const SupplierController = require("./controllers/SupplierController");
const AddressController = require("./controllers/AddressController");
const CouponController = require("./controllers/CouponController");

// Importar Middlewares de Validação
const validateUser = require("./middlewares/validateUser");
const validateOrder = require("./middlewares/validateOrder");
const validateProduct = require("./middlewares/validateProduct");
const validateCategory = require("./middlewares/validateCategory");
const validateSupplier = require("./middlewares/validateSupplier");
const validateAddress = require("./middlewares/validateAddress");
const validateCoupon = require("./middlewares/validateCoupon");

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
routes.post("/categories", validateCategory, CategoryController.create);
routes.get("/categories", CategoryController.getAll);
routes.get("/categories/:id", CategoryController.getById);
routes.put("/categories/:id", validateCategory, CategoryController.update);
routes.delete("/categories/:id", CategoryController.delete);
// --- ROTAS DE FORNECEDORES ---
routes.post("/suppliers", validateSupplier, SupplierController.create);
routes.get("/suppliers", SupplierController.getAll);
routes.get("/suppliers/:id", SupplierController.getById);
routes.put("/suppliers/:id", validateSupplier, SupplierController.update);
routes.delete("/suppliers/:id", SupplierController.delete);
// --- ROTAS DE CUPONS ---
routes.post("/coupons", validateCoupon, CouponController.create);
routes.get("/coupons", CouponController.getAll);
routes.get("/coupons/:id", CouponController.getById);
routes.put("/coupons/:id", validateCoupon, CouponController.update);
routes.delete("/coupons/:id", CouponController.delete);
// --- ROTAS DE ENDEREÇOS ---
routes.post("/address", validateAddress, AddressController.create);
routes.get("/address", AddressController.getAll);
routes.get("/address/:id", AddressController.getById);
routes.put("/address/:id", validateAddress, AddressController.update);
routes.delete("/address/:id", AddressController.delete);

module.exports = routes;
