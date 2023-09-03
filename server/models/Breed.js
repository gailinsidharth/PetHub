const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
  breed: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  age: { type: String, required: true },
  certification: { type: String, required: true },
  pictures: [{ type: String }], // An array to store multiple picture URLs
  breeder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Breeder',
  },
});

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed;
