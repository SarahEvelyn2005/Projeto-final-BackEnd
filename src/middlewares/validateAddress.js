const yup = require("yup");

const addressSchema = yup.object().shape({
  user: yup.string().required("ID do usuário é obrigatório"),
  street: yup.string().required("Rua é obrigatória"),
  number: yup.string().required("Número é obrigatório"),
  complement: yup.string().nullable(),
  district: yup.string().required("Bairro é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  state: yup
    .string()
    .matches(/^[A-Z]{2}$/, "Estado deve ter UF com 2 letras")
    .required("Estado é obrigatório"),
  zipcode: yup
    .string()
    .matches(/^\d{8}$/, "CEP deve conter 8 dígitos"),
  active: yup.boolean()
});

const validateAddress = async (req, res, next) => {
  try {
    await addressSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validateAddress;
