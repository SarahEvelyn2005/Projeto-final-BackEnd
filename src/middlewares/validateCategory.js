const yup = require("yup");

exports.categoryValidator = yup.object().shape({
  name: yup
    .string()
    .required("Nome da categoria é obrigatório"),
    
  slug: yup
    .string()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug deve estar em formato válido: apenas letras minúsculas, números e hifens"
    )
    .required("Slug é obrigatório"),

  description: yup
    .string()
    .max(300, "Descrição deve ter no máximo 300 caracteres")
    .nullable()
});
