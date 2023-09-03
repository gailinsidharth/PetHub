// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subCategories: { type: [String], default: [] },
  image: {
    type: String, 
    required: true,
  },

});

module.exports= mongoose.model('Category', categorySchema);


