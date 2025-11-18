const yup = require("yup");

const validateUser = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup
        .string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      password: yup
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
      role: yup.string().oneOf(["admin", "customer", "seller"]),
    });

    await schema.validate(req.body, { abortEarly: false });
    next(); // Se validou, passa para o Controller
  } catch (error) {
    return res.status(400).json({ errors: error.errors });
  }
};

module.exports = validateUser;
