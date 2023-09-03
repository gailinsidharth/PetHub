const express = require('express');
const { createUser, login, userProfile, viewUserById } = require('../controller/userController');
const authenticateToken = require('../middleware/auth');
const router = express.Router()



router.post('/user', createUser)
router.post('/login',login)
router.get('/userprofile', authenticateToken,userProfile)
router.get('/userprofilebyid/:id', authenticateToken,viewUserById)



module.exports = router;