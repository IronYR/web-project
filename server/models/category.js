const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Category Schema
const CategorySchema = new Schema({
  // Unique identifier for the category
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  name: {
    type: String,
    trim: true,
    required: true 
  },

  images: [{
    type: String,
    trim: true // Trim whitespace from URLs
  }],
  description: {
    type: String,
    trim: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', CategorySchema);
