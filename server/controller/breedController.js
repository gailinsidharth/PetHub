const Breed = require('../models/Breed')




const createBreed = async (req, res) => {
    try {
        const {breed,description, category, age, certification,pictures} = req.body; 
        const breeder = req.id
        const breeds = new Breed({breed,description, category, age, certification,pictures,breeder});
        await breeds.save();
        res.status(201).json({ message: 'Pet added successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error adding pet', error: error.message });
      }
  };


  const getAllBreeds = async (req, res) => {
    try {
      const breeds = await Breed.find().populate('breeder');
      res.status(200).json({ success: true, data: breeds });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };


  module.exports ={createBreed,getAllBreeds}