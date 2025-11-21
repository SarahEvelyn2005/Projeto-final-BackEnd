const Supplier = require("../models/supplier");

module.exports = {
  async create(req, res) {
    try {
      const supplier = await Supplier.create(req.body);
      return res.status(201).json(supplier);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  async findAll(req, res) {
    const suppliers = await Supplier.find();
    return res.json(suppliers);
  },

  async findOne(req, res) {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Fornecedor não encontrado" });
    return res.json(supplier);
  },

  async update(req, res) {
    try {
      const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(supplier);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  async delete(req, res) {
    try {
      await Supplier.findByIdAndDelete(req.params.id);
      return res.json({ message: "Fornecedor removido" });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
};
