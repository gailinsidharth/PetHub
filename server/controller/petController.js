
const Pet = require('../models/petModel')


const addPet = async (req, res) => {
    try {
      const {breed,description, category, age, certifiedPet,price,imageUrl} = req.body; 
      const sellerId = req.id
      const pet = new Pet({breed,description, category, age, certifiedPet,price,imageUrl,addedDate:new Date(),sellerId});
      await pet.save();
      res.status(201).json({ message: 'Pet added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding pet', error: error.message });
    }
  }

  const viewPet = async (req,res)=>{
   try{
    const pet = await Pet.find()
    res.json(pet)
  }
  catch{
  console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
}

const viewPetById = async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json(pet);
  } catch (error) {
    console.error('Error fetching pet details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  module.exports = {addPet,viewPet,viewPetById}