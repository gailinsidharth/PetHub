const express = require('express');
const { getConversations, getMessages, createMessage, getParticipantDetails } = require('../controller/chatController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();


router.get('/conversations',authenticateToken,getConversations)
router.get('/conversations/:conversationId/messages', getMessages)
router.post('/messages',createMessage)
router.get('/conversations/:conversationId/participants',getParticipantDetails)

module.exports = router;

