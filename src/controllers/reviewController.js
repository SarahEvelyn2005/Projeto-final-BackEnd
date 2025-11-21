const Review = require('../models/review');
const Product = require('../models/product');
const Order = require('../models/order');

const ReviewController = {
  // @desc    Create new review
  // @route   POST /api/reviews
  // @access  Private
  create: async (req, res) => {
    try {
      const { product, rating, title, comment } = req.body;

      // Check if product exists
      const productExists = await Product.findById(product);
      if (!productExists) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        });
      }

      // Check if user already reviewed this product
      const existingReview = await Review.findOne({
        user: req.user._id,
        product
      });

      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: 'Você já avaliou este produto'
        });
      }

      // Check if user purchased the product (for verified purchase)
      const hasPurchased = await Order.findOne({
        user: req.user._id,
        'items.product': product,
        status: 'delivered'
      });

      const review = new Review({
        user: req.user._id,
        product,
        rating,
        title,
        comment,
        isVerifiedPurchase: !!hasPurchased
      });

      const createdReview = await review.save();

      res.status(201).json({
        success: true,
        message: 'Avaliação criada com sucesso',
        data: createdReview
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Você já avaliou este produto'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao criar avaliação',
        error: error.message
      });
    }
  },

  // @desc    Get all reviews
  // @route   GET /api/reviews
  // @access  Public
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, product, user, status } = req.query;

      const filter = {};
      if (product) filter.product = product;
      if (user) filter.user = user;
      if (status) filter.status = status;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: '-createdAt',
        populate: [
          {
            path: 'user',
            select: 'name avatar'
          },
          {
            path: 'product',
            select: 'name images'
          }
        ]
      };

      const reviews = await Review.paginate(filter, options);

      res.json({
        success: true,
        data: reviews
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar avaliações',
        error: error.message
      });
    }
  },

  // @desc    Get single review
  // @route   GET /api/reviews/:id
  // @access  Public
  getById: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id)
        .populate('user', 'name avatar')
        .populate('product', 'name images');

      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Avaliação não encontrada'
        });
      }

      res.json({
        success: true,
        data: review
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar avaliação',
        error: error.message
      });
    }
  },

  // @desc    Update review
  // @route   PUT /api/reviews/:id
  // @access  Private
  update: async (req, res) => {
    try {
      const { rating, title, comment } = req.body;

      const review = await Review.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Avaliação não encontrada'
        });
      }

      review.rating = rating || review.rating;
      review.title = title || review.title;
      review.comment = comment || review.comment;
      review.status = 'pending'; // Reset status for approval

      const updatedReview = await review.save();

      res.json({
        success: true,
        message: 'Avaliação atualizada com sucesso',
        data: updatedReview
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar avaliação',
        error: error.message
      });
    }
  },

  // @desc    Delete review
  // @route   DELETE /api/reviews/:id
  // @access  Private
  delete: async (req, res) => {
    try {
      const review = await Review.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Avaliação não encontrada'
        });
      }

      await Review.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: 'Avaliação deletada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar avaliação',
        error: error.message
      });
    }
  },

  // @desc    Get product reviews
  // @route   GET /api/reviews/product/:productId
  // @access  Public
  getProductReviews: async (req, res) => {
    try {
      const { productId } = req.params;
      const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort,
        populate: {
          path: 'user',
          select: 'name avatar'
        }
      };

      const query = {
        product: productId,
        status: 'approved'
      };

      const reviews = await Review.paginate(query, options);

      res.json({
        success: true,
        data: reviews
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar avaliações do produto',
        error: error.message
      });
    }
  },

  // @desc    Update review status (Admin)
  // @route   PUT /api/reviews/:id/status
  // @access  Private/Admin
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;

      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Avaliação não encontrada'
        });
      }

      review.status = status;
      const updatedReview = await review.save();

      res.json({
        success: true,
        message: 'Status da avaliação atualizado com sucesso',
        data: updatedReview
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar status da avaliação',
        error: error.message
      });
    }
  }
};

module.exports = ReviewController;