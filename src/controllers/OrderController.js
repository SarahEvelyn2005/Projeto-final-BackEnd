const Order = require("../models/Order");

module.exports = {
  // 1. Criar Pedido
  async create(req, res) {
    try {
      const order = await Order.create(req.body);
      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar pedido." });
    }
  },

  // 2. Listar Todos (Com Populate)
  async getAll(req, res) {
    try {
      const orders = await Order.find()
        .populate("user_id", "name email")
        .populate("items.product_id", "name category");
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar pedidos." });
    }
  },

  // 3. Buscar por ID
  async getById(req, res) {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user_id", "name email")
        .populate("items.product_id", "name description price");

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ error: "ID de pedido inválido" });
    }
  },

  // 4. Atualizar
  async update(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar pedido." });
    }
  },

  // 5. Deletar
  async delete(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }
      return res.status(200).json({ message: "Pedido removido com sucesso!" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar pedido." });
    }
  },
};
