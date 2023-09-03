const express =  require('express')
const { createBreed, getAllBreeds } = require('../controller/breedController');
const authenticateToken = require('../middleware/auth');
const router =  express.Router()


router.post('/createbreed',authenticateToken, createBreed)
router.post('/getbreed',authenticateToken, getAllBreeds)



module.exports = router;