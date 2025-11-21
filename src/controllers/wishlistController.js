const Wishlist = require('../models/wishlist');
const Product = require('../models/product');

const WishlistController = {
  // @desc    Get user's wishlist
  // @route   GET /api/wishlist
  // @access  Private
  get: async (req, res) => {
    try {
      let wishlist = await Wishlist.findOne({ user: req.user._id })
        .populate('items.product', 'name images price stock discountPrice');

      if (!wishlist) {
        // Create empty wishlist if doesn't exist
        wishlist = new Wishlist({
          user: req.user._id,
          items: []
        });
        await wishlist.save();
      }

      res.json({
        success: true,
        data: wishlist
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar lista de desejos',
        error: error.message
      });
    }
  },

  // @desc    Add item to wishlist
  // @route   POST /api/wishlist/items
  // @access  Private
  addItem: async (req, res) => {
    try {
      const { productId, notes } = req.body;

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        });
      }

      let wishlist = await Wishlist.findOne({ user: req.user._id });

      if (!wishlist) {
        // Create wishlist if doesn't exist
        wishlist = new Wishlist({
          user: req.user._id,
          items: []
        });
      }

      // Check if product already in wishlist
      const existingItem = wishlist.items.find(
        item => item.product.toString() === productId
      );

      if (existingItem) {
        return res.status(400).json({
          success: false,
          message: 'Produto já está na lista de desejos'
        });
      }

      // Add product to wishlist
      wishlist.items.push({
        product: productId,
        notes: notes || ''
      });

      const updatedWishlist = await wishlist.save();
      await updatedWishlist.populate('items.product', 'name images price stock discountPrice');

      res.status(201).json({
        success: true,
        message: 'Produto adicionado à lista de desejos',
        data: updatedWishlist
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao adicionar à lista de desejos',
        error: error.message
      });
    }
  },

  // @desc    Remove item from wishlist
  // @route   DELETE /api/wishlist/items/:productId
  // @access  Private
  removeItem: async (req, res) => {
    try {
      const { productId } = req.params;

      const wishlist = await Wishlist.findOne({ user: req.user._id });

      if (!wishlist) {
        return res.status(404).json({
          success: false,
          message: 'Lista de desejos não encontrada'
        });
      }

      // Remove product from wishlist
      wishlist.items = wishlist.items.filter(
        item => item.product.toString() !== productId
      );

      const updatedWishlist = await wishlist.save();
      await updatedWishlist.populate('items.product', 'name images price stock discountPrice');

      res.json({
        success: true,
        message: 'Produto removido da lista de desejos',
        data: updatedWishlist
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao remover da lista de desejos',
        error: error.message
      });
    }
  },

  // @desc    Update wishlist item
  // @route   PUT /api/wishlist/items/:productId
  // @access  Private
  updateItem: async (req, res) => {
    try {
      const { productId } = req.params;
      const { notes } = req.body;

      const wishlist = await Wishlist.findOne({ user: req.user._id });

      if (!wishlist) {
        return res.status(404).json({
          success: false,
          message: 'Lista de desejos não encontrada'
        });
      }

      // Find and update item
      const item = wishlist.items.find(
        item => item.product.toString() === productId
      );

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado na lista de desejos'
        });
      }

      item.notes = notes || '';
      item.addedAt = new Date();

      const updatedWishlist = await wishlist.save();
      await updatedWishlist.populate('items.product', 'name images price stock discountPrice');

      res.json({
        success: true,
        message: 'Item da lista de desejos atualizado',
        data: updatedWishlist
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar item da lista de desejos',
        error: error.message
      });
    }
  },

  // @desc    Update wishlist settings
  // @route   PUT /api/wishlist/settings
  // @access  Private
  updateSettings: async (req, res) => {
    try {
      const { name, isPublic } = req.body;

      let wishlist = await Wishlist.findOne({ user: req.user._id });

      if (!wishlist) {
        // Create wishlist if doesn't exist
        wishlist = new Wishlist({
          user: req.user._id,
          items: []
        });
      }

      if (name !== undefined) wishlist.name = name;
      if (isPublic !== undefined) wishlist.isPublic = isPublic;

      const updatedWishlist = await wishlist.save();
      await updatedWishlist.populate('items.product', 'name images price stock discountPrice');

      res.json({
        success: true,
        message: 'Configurações da lista de desejos atualizadas',
        data: updatedWishlist
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar configurações da lista de desejos',
        error: error.message
      });
    }
  },

  // @desc    Clear wishlist
  // @route   DELETE /api/wishlist/clear
  // @access  Private
  clear: async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ user: req.user._id });

      if (!wishlist) {
        return res.status(404).json({
          success: false,
          message: 'Lista de desejos não encontrada'
        });
      }

      wishlist.items = [];
      const updatedWishlist = await wishlist.save();

      res.json({
        success: true,
        message: 'Lista de desejos limpa com sucesso',
        data: updatedWishlist
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao limpar lista de desejos',
        error: error.message
      });
    }
  }
};

module.exports = WishlistController;