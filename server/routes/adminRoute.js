const express = require('express')
const authenticateToken = require('../middleware/auth')
const { createAdmin, AdminLogin } = require('../controller/adminController')
const router = express.Router()


router.post('/admin',createAdmin)
router.post('/adminlogin',AdminLogin)

module.exports= router;