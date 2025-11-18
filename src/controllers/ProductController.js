const Product = require('../models/product');

module.exports = {
    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            return res.status(201).json(product);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar produto.' });
        }
    },

    async getAll(req, res) {
        try {
            // .populate('user_id') preenche os dados do usuário automaticamente (Relacionamento)
            const products = await Product.find().populate('user_id', 'name email');
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
    },

    async getById(req, res) {
        try {
            const product = await Product.findById(req.params.id).populate('user_id', 'name');
            if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({ error: 'ID inválido' });
        }
    },

    async update(req, res) {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar' });
        }
    },

    async delete(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
            return res.status(200).json({ message: 'Produto deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar' });
        }
    }
};
