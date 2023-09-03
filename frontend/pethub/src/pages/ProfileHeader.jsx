import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { axiosInstance } from '../utils/interceptors';
import Navbar from './Navbar';
import SidebarCart from './SidebarCart';

const ProfileHeader = ({ breeder }) => {


  const [isRequestSent, setIsRequestSent] = useState(false);
  const breederId = breeder._id;
 

  const handleBreedRequest = async () => {
    try {
      // Send breed request to the back-end API
      await axiosInstance.post('/breed-requests', {
        breederId,
      });

      setIsRequestSent(true);
    } catch (error) {
      console.error('Error sending breed request:', error);
    }
  };

  return (
    <div>
       
    <motion.div className="profile-header" whileHover={{ scale: 1.02 }} style={{marginTop:'50px'}}>
      <Card elevation={3} style={{ padding: '20px', borderRadius: '10px', display: 'flex',justifyContent:'space-around',alignItems:'center',width:'700px' }}>
        <Avatar alt="Profile" src={breeder.imageUrl} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <CardContent style={{ flex: 1, marginLeft: '20px' }}>
          <Typography variant="h5" className="profile-name">
            {breeder.firstname} {breeder.lastname}
          </Typography>
          <Typography variant="body1">
            <FontAwesomeIcon icon={faPhone} className="icon" /> {breeder.phone}
          </Typography>
          <Typography variant="body1">
            <FontAwesomeIcon icon={faEnvelope} className="icon" /> {breeder.email}
          </Typography>
          <Typography variant="body1">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> {breeder.location}
          </Typography>
          <Typography variant="body1">Breeder Since: {breeder.joinedDate}</Typography>
        </CardContent>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            className="breed-request-button"
            onClick={handleBreedRequest}
            disabled={isRequestSent}
            startIcon={<FontAwesomeIcon icon={faUserPlus} className="icon" />}
            style={{ textTransform: 'none' }}
          >
            {isRequestSent ? 'Request Sent' : 'Breed Request'}
          </Button>
        </div>
      </Card>
    </motion.div>
    </div>
  );
};

export default ProfileHeader;
