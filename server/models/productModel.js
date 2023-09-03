const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  details: { type: String, required: true },
  productPrice: { type: String, required: true },
  productQuantity: { type: String, required: true },
});

module.exports  = mongoose.model('Product', productSchema);

