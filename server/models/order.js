const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', 
        },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
    paymentIntentId: String,
  },
  { timestamps: true }
);

module.exports  = mongoose.model('Order', orderSchema);

