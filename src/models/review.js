import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Index for product ratings
reviewSchema.index({ product: 1, rating: 1 });
reviewSchema.index({ status: 1 });

// Update product rating when review is saved
reviewSchema.post('save', async function() {
  await this.model('Product').updateProductRating(this.product);
});

// Update product rating when review is removed
reviewSchema.post('remove', async function() {
  await this.model('Product').updateProductRating(this.product);
});

export default mongoose.model('Review', reviewSchema);