const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  breed: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  age: { type: String, required: true },
  certifiedPet: { type: Boolean, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  addedDate: { type: Date, required: true }, // Store the pet added date
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
});

module.exports  = mongoose.model('Pet', petSchema);

