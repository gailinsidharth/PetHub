const express = require('express');
const { addProduct, getProductsBySubcategory, getProduct, getProductsByCategory, deleteProduct } = require('../controller/productController');
const router = express.Router();


router.post('/addproduct', addProduct);
router.get('/getProductsBySubcategory/:subcategory',getProductsBySubcategory)
router.get('/getproduct',getProduct)
router.get('/products/:category',getProductsByCategory)
router.delete('/product/:key', deleteProduct);


module.exports = router;