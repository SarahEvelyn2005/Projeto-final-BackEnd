const Category = require("../models/category");

module.exports = {
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  async findAll(req, res) {
    const categories = await Category.find();
    return res.json(categories);
  },

  async findOne(req, res) {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Categoria não encontrada" });
    return res.json(category);
  },

  async update(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(category);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  async delete(req, res) {
    await Category.findByIdAndDelete(req.params.id);
    return res.json({ message: "Categoria removida" });
  }
};
