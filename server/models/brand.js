const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Brand Schema
const BrandSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email:{ type: String,
    validate: {
      validator: async function(email) {
        const Brand = await this.constructor.findOne({ email });
        if(Brand) {
          if(this.id === Brand.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'The specified email address is already in use.'
    },
    required: [true, 'Brand email required']
  },
  phoneNumber: {
    type: String
  },
  image: {
    type:String
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Brand', BrandSchema);