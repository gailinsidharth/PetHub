const express = require('express');
const authenticateToken = require('../middleware/auth');
const { addToCart } = require('../controller/userCartController');

const router = express.Router()

router.post('/userCartaddtocart', authenticateToken, addToCart);
router.get('/getuserCart', authenticateToken, addToCart);


module.exports = router;


