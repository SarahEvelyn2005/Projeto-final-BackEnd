const User = require("../models/user");

module.exports = {
  // Criar Usuário
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar usuário." });
    }
  },

  // Listar todos
  async getAll(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  },

  // Buscar por ID
  async getById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "ID inválido" });
    }
  },

  // Atualizar
  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar" });
    }
  },

  // Deletar
  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar" });
    }
  },
};
