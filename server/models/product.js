const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Product Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Product name is required'] 
  },

  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    trim: true,
    required: [true, 'Product description is required']
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  discount: {
    type: Number,
    min: [0, 'Discount cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand'
  },
  category:{
    type:String,
    required: [true, 'Category is required']
  },
  itemsSold:{
    type: Number,
    default: 0
  },
  updated: {
    type: Date,
    default: Date.now
  },
  avgRating:{
    type: Number,
    default: 0
  },
  longDescription:{
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});
ProductSchema.pre('save', function(next) {
  if (this.quantity === 0) {
      this.isActive = false; 
  }
  next();
});
// Create index on commonly queried fields if needed
// ProductSchema.index({ name: 1 });

module.exports = mongoose.model('Product', ProductSchema);
