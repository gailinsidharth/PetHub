const express = require('express')
const { createAddress, viewAddressById } = require('../controller/addressController')
const authenticateToken = require('../middleware/auth')
const router = express.Router()


router.post('/address',authenticateToken, createAddress)
router.get('/addressbyid',authenticateToken, viewAddressById)



module.exports = router