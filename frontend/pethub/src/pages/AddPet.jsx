import React, { useContext, useState } from 'react';
import { Button, Card, CardContent, FormGroup, FormControlLabel, Checkbox, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';
import { styled } from '@mui/system';
import { axiosInstance } from '../utils/interceptors';
import SellerDashboard from './SellerDashboard';

const AddPetContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const AddPetCard = styled(Card)({
  width: '400px',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
});

const H2 = styled('h2')({
  marginBottom: '20px',
});

export const AddPet = () => {
  const [formData, setFormData] = useState({
    breed: '',
    description: '',
    category: '',
    age: '',
    certifiedPet: false,
    price: '',
  });

  const navigate = useNavigate();
  const { image, handleImageUpload, setImage } = useContext(ImageContext);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const response = await handleImageUpload(file);
      const imageUrl = response.data.secure_url;
      setFormData((prev) => ({
        ...prev,
        imageUrl: imageUrl,
      }));
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance('/addpet', {
        method: 'POST',
        data: formData,
      });

      setFormData({
        breed: '',
        description: '',
        category: '',
        age: '',
        certifiedPet: false,
        price: '',
        imageUrl: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/sellerdashboard');
  };

  return (
    <div >
        <SellerDashboard/>
    <AddPetContainer style={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to bottom, #67B26F, #4ca2cd)',
      }}>
      <AddPetCard>
        <H2>Add Pet</H2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              label="Breed"
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              required
              fullWidth
              margin="dense"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              label="Description"
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              fullWidth
              margin="dense"
              multiline
            />
          </FormGroup>
          <FormGroup>
            <TextField
              label="Category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              fullWidth
              margin="dense"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              label="Age"
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              fullWidth
              margin="dense"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.certifiedPet}
                  onChange={handleInputChange}
                  name="certifiedPet"
                  color="primary"
                />
              }
              label="Certified Pet"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              label="Price"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              fullWidth
              margin="dense"
            />
          </FormGroup>
          <div className="dropzone input-container">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {image ? <img src={image} alt="Uploaded" /> : <p>Drag 'n' drop an image here, or click to select an image</p>}
          </div>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Pet
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel} fullWidth>
            Cancel
          </Button>
        </form>
      </AddPetCard>
    </AddPetContainer>
    </div>
  );
};
