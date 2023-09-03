import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import ProfileCard from './ProfileCard';
import { axiosInstance } from '../utils/interceptors';
import Navbar from './Navbar';
import SidebarCart from './SidebarCart';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
     const navigate =useNavigate()
  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

    useEffect(() => {
        // Fetch profiles from the backend using axios or your preferred method
        axiosInstance
          .get('/getbreeder') // Replace with your API endpoint
          .then((response) => {
            setProfiles(response.data);
          })
          .catch((error) => {
            console.error('Error fetching profiles:', error);
          });
      }, []);


    

  return (

    <div>
                <Navbar handleCartOpen={handleCartOpen}/>
                <SidebarCart open={cartOpen} onClose={handleCartClose} />
     <Container style={{marginTop:'50px'}}>
      <Grid container spacing={2}>
        {profiles.map((profile, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProfileCard profile={profile}  />
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
};

export default MainPage;
