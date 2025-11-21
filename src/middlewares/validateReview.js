const Joi = require('joi');

const reviewSchema = Joi.object({
  product: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID do produto deve ser um hexadecimal válido',
    'string.length': 'ID do produto deve ter 24 caracteres',
    'any.required': 'ID do produto é obrigatório'
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.min': 'Avaliação deve ser no mínimo 1',
    'number.max': 'Avaliação deve ser no máximo 5',
    'any.required': 'Avaliação é obrigatória'
  }),
  title: Joi.string().min(5).max(100).required().messages({
    'string.min': 'Título deve ter pelo menos 5 caracteres',
    'string.max': 'Título deve ter no máximo 100 caracteres',
    'any.required': 'Título é obrigatório'
  }),
  comment: Joi.string().min(10).max(1000).required().messages({
    'string.min': 'Comentário deve ter pelo menos 10 caracteres',
    'string.max': 'Comentário deve ter no máximo 1000 caracteres',
    'any.required': 'Comentário é obrigatório'
  })
});

const reviewUpdateSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).messages({
    'number.min': 'Avaliação deve ser no mínimo 1',
    'number.max': 'Avaliação deve ser no máximo 5'
  }),
  title: Joi.string().min(5).max(100).messages({
    'string.min': 'Título deve ter pelo menos 5 caracteres',
    'string.max': 'Título deve ter no máximo 100 caracteres'
  }),
  comment: Joi.string().min(10).max(1000).messages({
    'string.min': 'Comentário deve ter pelo menos 10 caracteres',
    'string.max': 'Comentário deve ter no máximo 1000 caracteres'
  })
});

const reviewStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'approved', 'rejected').required().messages({
    'any.only': 'Status deve ser: pending, approved ou rejected',
    'any.required': 'Status é obrigatório'
  })
});

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const validateReviewUpdate = (req, res, next) => {
  const { error } = reviewUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const validateReviewStatus = (req, res, next) => {
  const { error } = reviewStatusSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateReview,
  validateReviewUpdate,
  validateReviewStatus
};