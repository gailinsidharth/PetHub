const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { addToCart, removeFromCart, getCart,  } = require('../controller/cartController');



router.post('/add-to-cart',authenticateToken,addToCart)
router.post('/remove-from-cart', authenticateToken,removeFromCart)
router.get('/cart',authenticateToken, getCart)


module.exports = router