const express = require('express');
const { createCategory, getCategory, getCategoryById } = require('../controller/categoryController');
const router = express.Router();


router.post('/category',createCategory)
router.get('/getcategory',getCategory)
router.get('/getcategorybyid/:id',getCategoryById)



module.exports = router;
