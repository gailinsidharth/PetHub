const Product = require('../models/productModel')


 const addProduct = async (req, res) => {
    try {
      const {
        title,
        image,
        category,
        subCategory,
        details,
        productPrice,
        productQuantity
      } = req.body;
  
      const newProduct = new Product({
        title,
        image,
        category,
        subCategory,
        details,
        productPrice,
        productQuantity
      });
  
      const savedProduct = await newProduct.save();
  
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error adding product' });
    }
}

const getProduct = async (req,res)=>{
  try{
    const product = await Product.find()
    res.json(product)
  }
  catch{
  console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
}
const getProductsBySubcategory = async (req, res) => {
  const decodedSubcategory = decodeURIComponent(req.params.subcategory);
  
  try {
    const products = await Product.find({ subCategory: decodedSubcategory });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getProductsByCategory = async (req, res) => {
  const{ category }= req.params.category;
  const decodedCategory = decodeURIComponent(req.params.category)
  try {
    const products = await Product.find({ category:decodedCategory});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteProduct = async (req, res) => {
  const Key = req.params.key;

  try {
    // Find the product by key
    const product = await Product.deleteOne({ _id: Key});

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

  

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};


module.exports={addProduct,getProductsBySubcategory,getProduct,getProductsByCategory,deleteProduct}