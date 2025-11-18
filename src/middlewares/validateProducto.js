const yup = require('yup');

const validateProduct = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            name: yup.string().required('Nome do produto é obrigatório'),
            price: yup.number().positive('Preço deve ser positivo').required('Preço é obrigatório'),
            category: yup.string().required(),
            user_id: yup.string().length(24, 'ID do usuário inválido').required('É necessário vincular um usuário (vendedor)')
        });

        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

module.exports = validateProduct;
