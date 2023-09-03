const express = require('express')
const { createSeller, sellerLogin, getSellerById, getSellerDetails, getSeller, approveSeller, blockSeller } = require('../controller/sellerController')
const authenticateToken = require('../middleware/auth')
const router= express.Router()


router.get('/getsellerdetails/:sellerId',getSellerDetails)
router.post('/seller',createSeller)
router.post('/sellerlogin',sellerLogin)
router.get('/getsellerdata',getSeller)
router.post('/seller/:id/approve',approveSeller)
router.delete('/seller/:id',blockSeller)
router.get('/getseller',authenticateToken, getSellerById)


module.exports= router;