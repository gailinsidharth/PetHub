const Order = require('../models/order')

const createOrder = async (req, res) => {
    try {
      const { items, totalAmount, paymentIntentId } = req.body;
      const order = new Order({
        items,
        totalAmount,
        user: req.id, 
        paymentIntentId,
      });
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  module.exports = {createOrder}