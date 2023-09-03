const express = require('express')
const { addPet, viewPet, viewPetById } = require('../controller/petController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/viewpet',viewPet)
router.get('/viewpetById/:id',viewPetById)
router.post('/addpet',authenticateToken, addPet )

module.exports = router;