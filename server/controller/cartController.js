
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')



const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.id; 

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // If the cart doesn't exist, create a new cart
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      await cart.save();
      return res.status(201).json(cart);
    } else {
      // If the cart exists, check if the product is already in the cart
      const cartItem = cart.items.find((item) => item.product.equals(productId));
      if (cartItem) {
        // If the product is already in the cart, increase the quantity
        cartItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it as a new item
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
      return res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const  userId  = req.id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getCart = async (req, res) => {
  try {
    const  userId  = req.id; 

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


module.exports = {addToCart,removeFromCart,getCart}