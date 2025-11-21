const yup = require("yup");

exports.categoryValidator = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string()
});
