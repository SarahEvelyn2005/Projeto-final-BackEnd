const Address = require("../models/Address");

module.exports = {
  async create(req, res) {
    try {
      const address = await Address.create(req.body);
      return res.status(201).json(address);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar endereço" });
    }
  },

  async list(req, res) {
    try {
      const addresses = await Address.find().populate("user");
      return res.json(addresses);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar endereços" });
    }
  },

  async update(req, res) {
    try {
      const address = await Address.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.json(address);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar endereço" });
    }
  },

  async delete(req, res) {
    try {
      await Address.findByIdAndDelete(req.params.id);
      return res.json({ message: "Endereço removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao remover endereço" });
    }
  }
};
