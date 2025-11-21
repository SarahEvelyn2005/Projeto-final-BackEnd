const express = require("express");
const routes = express.Router();

// Importar Controllers
const UserController = require("./controllers/UserController");
const OrderController = require("./controllers/OrderController");
const ProductController = require("./controllers/ProductController");
const CategoryController = require("./controllers/CategoryController");
const SupplierController = require("./controllers/SupplierController");
const AddressController = require("./controllers/AddressController");
const CuponsController = require("./controllers/CuponsController");
const PaymentController = require("./controllers/paymentController");
const ReviewController = require("./controllers/ReviewController");
const WishlistController = require("./controllers/WishlistController");

// Importar Middlewares de Validação
const validateUser = require("./middlewares/validateUser");
const validateOrder = require("./middlewares/validateOrder");
const validateProduct = require("./middlewares/validateProduct");
const validateCategory = require("./middlewares/validateCategory");
const validateSupplier = require("./middlewares/validateSupplier");
const validateAddress = require("./middlewares/validateAddress");
const validateCupons = require("./middlewares/validateCupons");
const { validatePayment, validatePaymentStatus } = require("./middlewares/validatePayment");
const { validateReview, validateReviewUpdate, validateReviewStatus } = require("./middlewares/validateReview");
const { validateWishlistItem, validateWishlistSettings, validateWishlistItemUpdate } = require("./middlewares/validateWishlist");

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

// --- ROTAS DE PAGAMENTOS ---
routes.post("/payments", validatePayment, PaymentController.create);
routes.get("/payments", PaymentController.getAll);
routes.get("/payments/:id", PaymentController.getById);
routes.put("/payments/:id/status", validatePaymentStatus, PaymentController.updateStatus);
routes.delete("/payments/:id", PaymentController.delete);
routes.post("/payments/webhook", PaymentController.processWebhook);

// --- ROTAS DE AVALIAÇÕES ---
routes.post("/reviews", validateReview, ReviewController.create);
routes.get("/reviews", ReviewController.getAll);
routes.get("/reviews/:id", ReviewController.getById);
routes.put("/reviews/:id", validateReviewUpdate, ReviewController.update);
routes.delete("/reviews/:id", ReviewController.delete);
routes.get("/reviews/product/:productId", ReviewController.getProductReviews);
routes.put("/reviews/:id/status", validateReviewStatus, ReviewController.updateStatus);

// --- ROTAS DE LISTA DE DESEJOS ---
routes.get("/wishlist", WishlistController.get);
routes.post("/wishlist/items", validateWishlistItem, WishlistController.addItem);
routes.put("/wishlist/items/:productId", validateWishlistItemUpdate, WishlistController.updateItem);
routes.delete("/wishlist/items/:productId", WishlistController.removeItem);
routes.put("/wishlist/settings", validateWishlistSettings, WishlistController.updateSettings);
routes.delete("/wishlist/clear", WishlistController.clear);

// --- ROTAS DE CUPONS ---
routes.post("/cupons", validateCupons, CuponsController.create);
routes.get("/cupons", CuponsController.getAll);
routes.get("/cupons/:id", CuponsController.getById);
routes.put("/cupons/:id", validateCupons, CuponsController.update);
routes.delete("/cupons/:id", CuponsController.delete);
// --- ROTAS DE ENDEREÇOS ---
routes.post("/address", validateAddress, AddressController.create);
routes.get("/address", AddressController.getAll);
routes.get("/address/:id", AddressController.getById);
routes.put("/address/:id", validateAddress, AddressController.update);
routes.delete("/address/:id", AddressController.delete);

module.exports = routes;
