import React, { useEffect, useState } from 'react';
import { Typography, Button, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import { axiosInstance } from '../utils/interceptors';

const AvailableBreeds = ({ userId }) => {
  const [breed, setBreed] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (breed) => {
    setSelectedBreed(breed);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBreed(null);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const respon = await axiosInstance.get(`/getbreederwithbreeds/${userId}`);
      setBreed(respon.data.breeds);
      console.log(breed, '==breeder');
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div className="available-breeds">
      <Typography variant="h5" className="section-heading">
        Available Breeds for Breeding
      </Typography>
      {breed.map((breed) => (
        <motion.div key={breed._id} className="breed-item" whileHover={{ scale: 1.02 }}>
          <Typography variant="body1">
            {breed.breed} - click the image to view the details
          </Typography>
          <div className="breed-images">
            {breed.pictures.map((picture, index) => (
              <div className="breeding-image-container" key={breed._id}>
                <img
                  key={index}
                  src={picture}
                  alt={`Breed ${index + 1}`}
                  className="breeding-image"
                  onClick={() => handleImageClick(breed)}
                />
                <div
                  className="breeding-image-overlay"
                  style={{
                    color: 'black', // Change to your desired text color
                  }}
                >
                  <Typography
                    variant="body2"
                    className="breeding-image-overlay-text"
                    onClick={() => handleImageClick(breed)}
                  >
                    {breed.breed}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="breed-details"
          style={{
            backgroundColor: '#e0e0e0', // Change to your desired background color
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '400px', // Adjust the maximum width of the modal
          }}
        >
          <Typography variant="h6">{selectedBreed?.breed}</Typography>
          <Typography variant="body1">{selectedBreed?.category}</Typography>
          <Typography variant="body1">{selectedBreed?.age}</Typography>
          <Typography variant="body1">{selectedBreed?.certification}</Typography>
          <Typography variant="body1">{selectedBreed?.description}</Typography>
          <Button
            className="btnn"
            onClick={closeModal}
            style={{
              backgroundColor: '#4caf50', // Change to your desired color
              color: '#ffffff', // Change to your desired text color
              border: 'none',
              borderRadius: '5px',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              marginTop: '10px',
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AvailableBreeds;
