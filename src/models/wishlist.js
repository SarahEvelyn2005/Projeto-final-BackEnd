import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'My Wishlist',
    trim: true,
    maxlength: 50
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 200
    }
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Ensure one wishlist per user (for simplicity)
wishlistSchema.index({ user: 1 }, { unique: true });

// Index for product search in wishlist
wishlistSchema.index({ 'items.product': 1 });

export default mongoose.model('Wishlist', wishlistSchema);