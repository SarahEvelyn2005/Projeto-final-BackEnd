const Coupon = require("../models/Coupon");

module.exports = {
  async create(req, res) {
    try {
      const coupon = await Coupon.create(req.body);
      return res.status(201).json(coupon);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao criar cupom" });
    }
  },

  async list(req, res) {
    try {
      const coupons = await Coupon.find();
      return res.json(coupons);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao listar cupons" });
    }
  },

  async update(req, res) {
    try {
      const coupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.json(coupon);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao atualizar cupom" });
    }
  },

  async delete(req, res) {
    try {
      await Coupon.findByIdAndDelete(req.params.id);
      return res.json({ message: "Cupom removido com sucesso" });
    } catch (err) {
      return res.status(500).json({ error: "Erro ao remover cupom" });
    }
  }
};
