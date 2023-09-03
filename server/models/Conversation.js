const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }, { type: mongoose.Schema.Types.ObjectId, ref: 'Breeder' }],
});

module.exports = mongoose.model('Conversation', conversationSchema);