const yup = require("yup");

exports.supplierValidator = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required(),
  email: yup.string().email(),
  phone: yup.string(),
  active: yup.boolean()
});
