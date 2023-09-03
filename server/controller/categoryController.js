const Category = require('../models/Category');

createCategory = async (req, res) => {
    try {
      const { name, image ,subCategories} = req.body; 
  
      const category = new Category({ name, image,subCategories });
      await category.save();
  
      res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getCategory = async (req, res) => {
    try{
        const category = await Category.find()
        res.json(category)
      }
      catch{
      console.error(error);
          res.status(500).json({ message: 'Server Error' });
      }
  }

  const getCategoryById = async (req, res) => {
   
    try{
      const {subcategoryid} = req.params.id;
      const category = await Category.findById(subcategoryid)
      res.json(category)
    }
  catch (error) {
    console.error('Error fetching seller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };

  module.exports = {createCategory,getCategory,getCategoryById}