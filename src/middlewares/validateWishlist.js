const Joi = require('joi');

const wishlistItemSchema = Joi.object({
  productId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID do produto deve ser um hexadecimal válido',
    'string.length': 'ID do produto deve ter 24 caracteres',
    'any.required': 'ID do produto é obrigatório'
  }),
  notes: Joi.string().max(200).allow('').messages({
    'string.max': 'Notas devem ter no máximo 200 caracteres'
  })
});

const wishlistSettingsSchema = Joi.object({
  name: Joi.string().min(1).max(50).messages({
    'string.min': 'Nome da wishlist deve ter pelo menos 1 caractere',
    'string.max': 'Nome da wishlist deve ter no máximo 50 caracteres'
  }),
  isPublic: Joi.boolean().messages({
    'boolean.base': 'isPublic deve ser um valor booleano'
  })
});

const wishlistItemUpdateSchema = Joi.object({
  notes: Joi.string().max(200).allow('').messages({
    'string.max': 'Notas devem ter no máximo 200 caracteres'
  })
});

const validateWishlistItem = (req, res, next) => {
  const { error } = wishlistItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const validateWishlistSettings = (req, res, next) => {
  const { error } = wishlistSettingsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const validateWishlistItemUpdate = (req, res, next) => {
  const { error } = wishlistItemUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateWishlistItem,
  validateWishlistSettings,
  validateWishlistItemUpdate
};