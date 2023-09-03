import React, { useContext, useState } from 'react';
import { Button, FormControl, InputLabel, Input, Card, CardContent, Typography, CardHeader, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';
import { motion } from 'framer-motion';
import { axiosInstance } from '../utils/interceptors';

const RegisterBreeder = () => {
    const [breederData, setBreederData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      location: '',
      imageUrl: '',
    });
  
    const navigate = useNavigate();
    const { image, handleImageUpload, setImage } = useContext(ImageContext);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setBreederData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      try {
        const response = await handleImageUpload(file);
        const imageUrl = response.data.secure_url;
        setBreederData((prev) => ({
          ...prev,
          imageUrl: imageUrl,
        }));
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axiosInstance.post('/breeder', breederData);
  
        setBreederData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          phone: '',
          joinedDate: '',
          location: '',
          imageUrl: '',
        });
        setImage(null);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const onCancelClick = () => {
      navigate('/becomesellerorbreeder');
    };
  
    return (

      <div   style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #67B26F, #4ca2cd)',
      }}> 
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="register-breeder"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      >
        <Card style={{ maxWidth: 400, width: '100%', padding: '20px' }}>
          <CardContent>
            <h2 style={{ textAlign: 'center' }}>Register as a Breeder</h2>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth className="input-container" margin="normal">
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input id="firstname" name="firstname" value={breederData.firstname} onChange={handleChange} required />
              </FormControl>
              <FormControl fullWidth className="input-container" margin="normal">
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input id="lastname" name="lastname" value={breederData.lastname} onChange={handleChange} required />
              </FormControl>
              <FormControl fullWidth className="input-container" margin="normal">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" type="email" value={breederData.email} onChange={handleChange} required />
              </FormControl>
              <FormControl fullWidth className="input-container" margin="normal">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" type="password" value={breederData.password} onChange={handleChange} required />
              </FormControl>
              <FormControl fullWidth className="input-container" margin="normal">
                <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                <Input id="confirmpassword" name="confirmpassword" type="password" value={breederData.confirmpassword} onChange={handleChange} required />
              </FormControl>
              <FormControl fullWidth className="input-container" margin="normal">
                <InputLabel htmlFor="phone">Phone Number</InputLabel>
                <Input id="phone" name="phone" type="tel" value={breederData.phone} onChange={handleChange} required />
              </FormControl>
              <FormControl fullWidth className="input-container" margin="normal">
                <InputLabel htmlFor="location">Location</InputLabel>
                <Input id="location" name="location" value={breederData.location} onChange={handleChange} required />
              </FormControl>
              <div className="dropzone input-container">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {image ? <img src={image} alt="Uploaded" /> : <p>Drag 'n' drop an image here, or click to select an image</p>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button variant="contained" color="primary" startIcon={<FontAwesomeIcon icon={faUserPlus} className="icon" />} type="submit">
                  Register Breeder
                </Button>
                <Button variant="contained" color="secondary" onClick={onCancelClick} startIcon={<FontAwesomeIcon icon={faClose} className="icon" />}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      </div>
    );
  };
  
  export default RegisterBreeder;