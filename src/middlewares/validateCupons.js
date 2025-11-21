const yup = require("yup");

const couponSchema = yup.object().shape({
  code: yup
    .string()
    .uppercase("Código deve ser em letras maiúsculas")
    .required("Código do cupom é obrigatório"),
  discount: yup
    .number()
    .min(1, "Desconto mínimo é 1%")
    .max(90, "Desconto máximo é 90%")
    .required("Valor de desconto é obrigatório"),
  expiresAt: yup
    .date()
    .typeError("Data de expiração inválida")
    .required("Data de expiração é obrigatória"),
  active: yup.boolean()
});

const validateCoupon = async (req, res, next) => {
  try {
    await couponSchema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validateCoupon;
