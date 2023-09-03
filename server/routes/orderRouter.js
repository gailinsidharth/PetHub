const express = require('express');
const { createOrder } = require('../controller/orderController');
const router = express.Router();

router.post('/createpayment',createOrder)

module.exports = router;
