const yup = require("yup");

exports.supplierValidator = yup.object().shape({
  name: yup.string().required("Nome do fornecedor é obrigatório"),
  cnpj: yup
    .string()
    .matches(/^\d{14}$/, "CNPJ deve conter 14 dígitos numéricos")
    .required("CNPJ é obrigatório"),
  email: yup.string().email("Email inválido"),
  phone: yup
    .string()
    .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos")
    .nullable(),
  active: yup.boolean().default(true),
});
