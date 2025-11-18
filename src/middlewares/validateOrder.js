const yup = require("yup");

const validateOrder = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      user_id: yup
        .string()
        .length(24, "ID do usuário inválido")
        .required("Usuário é obrigatório"),
      items: yup
        .array()
        .of(
          yup.object().shape({
            product_id: yup
              .string()
              .length(24, "ID do produto inválido")
              .required(),
            quantity: yup.number().min(1, "Quantidade mínima é 1").required(),
            price: yup.number().positive("Preço deve ser positivo").required(),
          })
        )
        .min(1, "O pedido deve ter pelo menos 1 item")
        .required(),
      total: yup.number().positive().required("Total do pedido é obrigatório"),
      status: yup
        .string()
        .oneOf(["pending", "paid", "shipped", "delivered", "canceled"]),
    });

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ errors: error.errors });
  }
};

module.exports = validateOrder;
