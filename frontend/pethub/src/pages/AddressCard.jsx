import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import { LocationOn as LocationOnIcon } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import Navbar from './Navbar';
import SidebarCart from './SidebarCart';
import { axiosInstance } from '../utils/interceptors';
import Dashboard from './Dashboard';
import ManageAddresses from './ManageAddresses';

const AddressCard = () => {
  const [address, setAddress] = useState(null); // Initialize with null

  useEffect(() => {
    fetchAddressData();
  }, []);

  const fetchAddressData = async () => {
    try {
      const response = await axiosInstance.get('/addressbyid'); // Replace with your API endpoint
      const addresses = response.data;
      if (addresses.length > 0) {
        setAddress(addresses[0]); // Using the first address in the array
      }
    } catch (error) {
      console.error('Error fetching address data:', error);
    }
  };

  const [cartOpen, setCartOpen] = useState(false);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  return (
    <div>
          <Navbar handleCartOpen={handleCartOpen}/>
        <SidebarCart open={cartOpen} onClose={handleCartClose} />
   
    <div style={{ display: 'flex', marginLeft:'300px',marginTop:'100px'  }}>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      > 
      <Dashboard/>
        <Card elevation={3} style={{ borderRadius: '10px' }}>
          <CardContent>
            {address && (
              <Grid container spacing={2}>
                <Grid item xs={2} style={{ textAlign: 'center' }}>
                  <IconButton disabled>
                    <LocationOnIcon fontSize="large" style={{ color: grey[500] }} />
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6" color="textSecondary">
                    {address.addressType}
                  </Typography>
                  <Typography variant="body1">{address.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {address.mobileNumber}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {address.locality}, {address.pincode}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {address.address}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
        <ManageAddresses/>
      </motion.div>
    </div>
    </div>
  );
};

export default AddressCard;
