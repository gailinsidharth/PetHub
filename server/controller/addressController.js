const Address = require('../models/address');

// Controller function to create and save a new address
const createAddress = async (req, res) => {
  const {
    name,
    mobileNumber,
    pincode,
    locality,
    address,
    addressType,
    
  } = req.body;

  const userId = req.id;
  try {
    const newAddress = await Address.create({
    name,
      mobileNumber,
      pincode,
      locality,
      address,
      addressType,
       user:userId, 
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ error: 'Failed to create the address' });
  }
};


const viewAddressById = async (req, res) => {
    try {
      const userId = req.id;
      const address = await Address.find({user:userId});
  
      if (!address) {
        return res.status(404).json({ error: 'user address not found' });
      }
  
      res.json(address);
    } catch (error) {
      console.error('Error fetching pet details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
  createAddress,
  viewAddressById
};
