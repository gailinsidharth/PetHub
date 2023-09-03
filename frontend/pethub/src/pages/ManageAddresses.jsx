import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import { axiosInstance } from '../utils/interceptors';
import SidebarCart from './SidebarCart';

const ManageAddresses = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [addrs, setAddrs] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };


  

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    console.log('Address details submitted:', {
      name,
      mobileNumber,
      pincode,
      locality,
      address,
      addressType,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const respn = await axiosInstance(`/addressbyid`);
      setAddrs(respn.data);
      console.log(respn.data);
    } catch (error) {
      console.error('Error fetching address data:', error);
    }
  };

  const postData = async () => {
    try {
      axiosInstance(`/address`, {
        method: 'POST',
        data: {
          name,
          mobileNumber,
          pincode,
          locality,
          address,
          addressType,
        },
      });
    } catch (error) {
      console.error('Error posting address data:', error);
    }
  };

  const handleUseLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  };

  const onCancelClick = () => {
    navigate(`/myprofile/${userId}`);
  };

  return (
    <div>
        <Navbar handleCartOpen={handleCartOpen}/>
        <SidebarCart open={cartOpen} onClose={handleCartClose} />
   
    <div style={{marginLeft:'200px', marginTop:'50px'}}>
        
   
    <Container>
      <Dashboard />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h5" gutterBottom>
          Manage Addresses
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="10-digit mobile number"
                  fullWidth
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
                <TextField
                  label="Pincode"
                  fullWidth
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
                <TextField
                  label="Locality"
                  fullWidth
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  required
                />
                <TextField
                  label="Address (Area and Street)"
                  fullWidth
                  multiline
                  rows={4}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Address Type</FormLabel>
                  <RadioGroup
                    row
                    aria-label="addressType"
                    name="addressType"
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                  >
                    <FormControlLabel value="Home" control={<Radio />} label="Home" />
                    <FormControlLabel value="Work" control={<Radio />} label="Work" />
                  </RadioGroup>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                  SAVE
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={onCancelClick}>
                  CANCEL
                </Button>
              </form>
              <Button className="use-location-button" onClick={handleUseLocation} color="info">
                Use my current location
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            {addrs.map((data) => (
              <div key={data._id}>
                <h5 className="existing-address-heading">Existing Addresses</h5>
                <div className="existing-address">
                  <strong>{data.addressType}</strong>
                  <br />
                  {data.name}
                  <br />
                  {data.address} {data.pincode}
                  <br />
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      </motion.div>
  
    </Container>
    </div>
    </div>
  );
};

export default ManageAddresses;
