const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const Breeder = require('../models/Breeder');


async function getParticipantDetails(participants) {
    const users = await User.find({ _id: { $in: participants } });
    const breeders = await Breeder.find({ _id: { $in: participants } });
  
    const participantDetails = users.concat(breeders);
    return participantDetails;
  }

  
  const getConversations = async (req, res) => {
    try {
      const userId = req.user.userId; // Get the authenticated user's ID
      const userConversations = await Conversation.find({ participants: userId }).populate('participants');
      res.json(userConversations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversations' });
    }
  };
  


  const getMessages = async (req, res) => {
    try {
      const conversationId = req.params.conversationId;
      const messages = await Message.find({ conversation: conversationId }).populate('sender');
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };

  const createMessage = async (req, res) => {
    try {
      const { conversationId, recipientId, text } = req.body;
      const senderId = req.user.userId; // Get the authenticated user's ID
  
      const message = await Message.create({
        conversation: conversationId,
        sender: senderId,
        recipient: recipientId,
        text,
      });
  
      // Emit a real-time event to the recipient about the new message
      req.io.to(recipientId).emit('new_message', message);
  
      res.status(201).json({ message: 'Message sent successfully', message });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send the message' });
    }
  };


  const getParticipantsDetails = async (req, res) => {
    try {
      const conversationId = req.params.conversationId;
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      const participantsDetails = await getParticipantDetails(conversation.participants);
      res.json(participantsDetails);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch participants details' });
    }
  };

  module.exports = {getConversations,getMessages,createMessage,getParticipantDetails}