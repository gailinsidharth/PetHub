import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { axiosInstance } from '../utils/interceptors';
import ProfileHeader from './ProfileHeader';
import AvailableBreeds from './AvailableBreeds';
import Navbar from './Navbar';
import SidebarCart from './SidebarCart';

const ProfilePage = () => {
  const { userId } = useParams();
  const [breeder, setBreeder] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
 
 const navigate =useNavigate() 
const handleCartOpen = () => {
 setCartOpen(true);
};

const handleCartClose = () => {
 setCartOpen(false);
};

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axiosInstance.get(`/getbreederbyid/${userId}`);
      setBreeder(response.data);
      console.log(breeder, '==breeder');
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div>
         <Navbar handleCartOpen={handleCartOpen}/>
                <SidebarCart open={cartOpen} onClose={handleCartClose} />
    <motion.div className="profile-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container>
        <ProfileHeader breeder={breeder} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="breed-request-section">{/* Breed requests and messaging buttons */}</div>
          </Grid>
          <Grid item xs={12}>
            <AvailableBreeds userId={userId} />
          </Grid>
          <Grid item xs={12}>
           
          </Grid>
        </Grid>
      </Container>
    </motion.div>

    </div>
  );
};

export default ProfilePage;
