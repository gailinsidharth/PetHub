const UserCart = require('../models/userCart')
const Product = require('../models/productModel')

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.id; // Assuming you have user ID from authentication middleware
    
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        let userCart = await UserCart.findOne({ user: userId });
    
        if (!userCart) {
          // If the user's cart doesn't exist, create a new cart
          userCart = new UserCart({
            user: userId,
            items: [{ product: productId, quantity }],
          });
        } else {
          // If the user's cart exists, check if the product is already in the cart
          const cartItem = userCart.items.find((item) => item.product.equals(productId));
    
          if (cartItem) {
            // If the product is already in the cart, increase the quantity
            cartItem.quantity += quantity;
          } else {
            // If the product is not in the cart, add it as a new item
            userCart.items.push({ product: productId, quantity });
          }
        }
    
        await userCart.save();
        res.status(201).json(userCart);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
      }
  };

  const getCart = async (req, res) => {
    try {
      const userId = req.id; 
  
      const userCart = await UserCart.findOne({ user: userId }).populate('items.product');
      if (!userCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      res.json(userCart);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  module.exports = { addToCart , getCart};