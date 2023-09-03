const mongoose = require('mongoose');

const breedRequestSchema = new mongoose.Schema({
    breederId: { type: mongoose.Schema.Types.ObjectId, ref: 'Breeder', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  }, { timestamps: true });
  
  module.exports = mongoose.model('BreedRequest', breedRequestSchema);
  