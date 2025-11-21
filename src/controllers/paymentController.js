const Payment = require('../models/payment');
const Order = require('../models/order');

const PaymentController = {
  // @desc    Create new payment
  // @route   POST /api/payments
  // @access  Private
  create: async (req, res) => {
    try {
      const {
        order,
        paymentMethod,
        amount,
        currency,
        paymentDetails
      } = req.body;

      // Check if order exists
      const orderExists = await Order.findById(order);
      if (!orderExists) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      // Check if payment already exists for this order
      const existingPayment = await Payment.findOne({ order });
      if (existingPayment) {
        return res.status(400).json({
          success: false,
          message: 'Já existe um pagamento para este pedido'
        });
      }

      // Generate transaction ID
      const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

      const payment = new Payment({
        user: req.user._id,
        order,
        paymentMethod,
        amount,
        currency: currency || 'BRL',
        transactionId,
        paymentDetails,
        status: 'pending'
      });

      const createdPayment = await payment.save();

      // Update order payment status
      await Order.findByIdAndUpdate(order, {
        paymentStatus: 'pending'
      });

      res.status(201).json({
        success: true,
        message: 'Pagamento criado com sucesso',
        data: createdPayment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar pagamento',
        error: error.message
      });
    }
  },

  // @desc    Get all payments for user
  // @route   GET /api/payments
  // @access  Private
  getAll: async (req, res) => {
    try {
      const payments = await Payment.find({ user: req.user._id })
        .populate('order', 'orderNumber totalAmount items')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: payments
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pagamentos',
        error: error.message
      });
    }
  },

  // @desc    Get single payment
  // @route   GET /api/payments/:id
  // @access  Private
  getById: async (req, res) => {
    try {
      const payment = await Payment.findOne({
        _id: req.params.id,
        user: req.user._id
      }).populate('order');

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Pagamento não encontrado'
        });
      }

      res.json({
        success: true,
        data: payment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pagamento',
        error: error.message
      });
    }
  },

  // @desc    Update payment status
  // @route   PUT /api/payments/:id/status
  // @access  Private/Admin
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;

      const payment = await Payment.findById(req.params.id);
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Pagamento não encontrado'
        });
      }

      payment.status = status;
      if (status === 'completed') {
        payment.paymentDate = new Date();
      }

      const updatedPayment = await payment.save();

      // Update order payment status
      await Order.findByIdAndUpdate(payment.order, {
        paymentStatus: status
      });

      res.json({
        success: true,
        message: 'Status do pagamento atualizado com sucesso',
        data: updatedPayment
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar status do pagamento',
        error: error.message
      });
    }
  },

  // @desc    Process payment webhook
  // @route   POST /api/payments/webhook
  // @access  Public
  processWebhook: async (req, res) => {
    try {
      const { transactionId, status, paymentDetails } = req.body;

      const payment = await Payment.findOne({ transactionId });
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Pagamento não encontrado'
        });
      }

      payment.status = status;
      if (status === 'completed') {
        payment.paymentDate = new Date();
        payment.paymentDetails = {
          ...payment.paymentDetails,
          ...paymentDetails
        };
      }

      await payment.save();

      // Update order payment status
      await Order.findByIdAndUpdate(payment.order, {
        paymentStatus: status
      });

      res.json({
        success: true,
        message: 'Webhook de pagamento processado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao processar webhook de pagamento',
        error: error.message
      });
    }
  },

  // @desc    Delete payment
  // @route   DELETE /api/payments/:id
  // @access  Private/Admin
  delete: async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Pagamento não encontrado'
        });
      }

      await Payment.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: 'Pagamento deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar pagamento',
        error: error.message
      });
    }
  }
};

module.exports = PaymentController;