const Joi = require('joi');

const paymentSchema = Joi.object({
  order: Joi.string().hex().length(24).required().messages({
    'string.hex': 'ID do pedido deve ser um hexadecimal válido',
    'string.length': 'ID do pedido deve ter 24 caracteres',
    'any.required': 'ID do pedido é obrigatório'
  }),
  paymentMethod: Joi.string().valid('credit_card', 'debit_card', 'paypal', 'pix', 'bank_transfer').required().messages({
    'any.only': 'Método de pagamento deve ser: credit_card, debit_card, paypal, pix ou bank_transfer',
    'any.required': 'Método de pagamento é obrigatório'
  }),
  amount: Joi.number().positive().required().messages({
    'number.positive': 'Valor deve ser positivo',
    'any.required': 'Valor é obrigatório'
  }),
  currency: Joi.string().valid('BRL', 'USD', 'EUR').default('BRL').messages({
    'any.only': 'Moeda deve ser: BRL, USD ou EUR'
  }),
  paymentDetails: Joi.object({
    cardLastFour: Joi.string().length(4).pattern(/^[0-9]+$/).messages({
      'string.length': 'Últimos 4 dígitos do cartão devem ter exatamente 4 caracteres',
      'string.pattern': 'Últimos 4 dígitos do cartão devem conter apenas números'
    }),
    cardBrand: Joi.string().valid('visa', 'mastercard', 'amex', 'elo', 'hipercard').messages({
      'any.only': 'Bandeira do cartão deve ser: visa, mastercard, amex, elo ou hipercard'
    }),
    payerEmail: Joi.string().email().messages({
      'string.email': 'Email do pagador deve ser um email válido'
    }),
    payerName: Joi.string().min(2).max(100).messages({
      'string.min': 'Nome do pagador deve ter pelo menos 2 caracteres',
      'string.max': 'Nome do pagador deve ter no máximo 100 caracteres'
    })
  }).optional()
});

const paymentStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'completed', 'failed', 'refunded').required().messages({
    'any.only': 'Status deve ser: pending, processing, completed, failed ou refunded',
    'any.required': 'Status é obrigatório'
  })
});

const validatePayment = (req, res, next) => {
  const { error } = paymentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

const validatePaymentStatus = (req, res, next) => {
  const { error } = paymentStatusSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validatePayment,
  validatePaymentStatus
};