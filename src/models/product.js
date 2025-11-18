const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    // RELACIONAMENTO: Referência ao ID do Usuário (Vendedor)
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Nome do Model referenciado
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
