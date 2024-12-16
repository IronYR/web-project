const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Order Schema
const OrderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
       type: Number,
      required: true,
      min:1 
    }
  }],

  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod:{
    type: String,
    required: true
  },
  placedAt: {
    type: Date,
    default: Date.now
  },

  // Status of the order
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered'],
    default: 'Processing'
  }
});

// Create index on commonly queried fields if needed
// OrderSchema.index({ user: 1, status: 1 });

// Compile the schema into a model and export
module.exports = mongoose.model('Order', OrderSchema);
