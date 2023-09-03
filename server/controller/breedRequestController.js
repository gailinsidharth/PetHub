const BreedRequest = require('../models/BreedRequest')


const breedRequest = async (req, res) => {
    try {
      // Create a new breed request in the database
      const { breederId} = req.body;
       const userId = req.id
      const breedRequest = new BreedRequest({ breederId, userId });
      await breedRequest.save();
  
      res.status(201).json({ message: 'Breed request sent successfully' });
    } catch (error) {
      console.error('Error creating breed request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const viewRequest = async (req, res) => {
    try {
      const breederId = req.params.breederId;
  
      // Fetch breed requests for the specified breeder from the database
      const breedRequests = await BreedRequest.find({ breederId }).populate('userId');
      res.status(200).json(breedRequests);
    } catch (error) {
      console.error('Error fetching breed requests:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


const deleteReq = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    // Delete the breed request
    const result = await BreedRequest.deleteOne({ _id: requestId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Breed request not found' });
    }

    res.status(200).json({ message: 'Breed request deleted successfully' });
  } catch (error) {
    console.error('Error deleting breed request:', error);
    res.status(500).json({ message: 'An error occurred while deleting the breed request' });
  }
};

  module.exports = {breedRequest,viewRequest,deleteReq}