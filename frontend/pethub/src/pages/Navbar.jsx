import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Badge, Avatar } from '@mui/material';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import SecondaryNavbar from './SecondaryNavbar';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/interceptors';

const Navbar = ({ handleCartOpen }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate('/pethom');
  }

  const onProfileClick = () => {
    navigate('/userdash');
  }

  const onBreedingClick = () => {
    navigate('/breeders');
  }

  useEffect(() => {
    fetchCartData(); // Fetch cart data when component mounts
    fetchAutocompleteData(); // Fetch autocomplete data when component mounts
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axiosInstance.get('/cart'); // Replace with your API endpoint
      const cartData = response.data.items; // Access the 'items' property
      const totalItems = cartData.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(totalItems);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const fetchAutocompleteData = async () => {
    try {
      // Fetch data from three different APIs and combine them
      const response1 = await axiosInstance.get('/getproduct'); // Replace with your API endpoint
      const response2 = await axiosInstance.get('/getbreeder'); // Replace with your API endpoint
      const response3 = await axiosInstance.get('/getproduct'); // Replace with your API endpoint

      const combinedData = [
        ...response1.data,
        ...response2.data,
        ...response3.data,
      ];

      setSearchResults(combinedData);
    } catch (error) {
      console.error('Error fetching autocomplete data:', error);
    }
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    
    if (searchResults && Array.isArray(searchResults) && searchText.trim() !== "") {
      const filteredResults = searchResults.filter(item => 
        item && item.label && item.label.toLowerCase().includes(searchText)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#599964' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={onHomeClick}>
          {/* Logo */}
          <Typography variant="h6" component="div" >
            Pet Hub
          </Typography>
        </div>

        {/* Center Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '5px 10px', borderRadius: '5px', width: '500px' }}>
            <SearchIcon style={{ marginRight: '5px' }} />
            <InputBase
              placeholder="Search..."
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Notification Icon with Badge */}
          <Typography variant="h6" component="div" onClick={onBreedingClick}>
            Breeding Services
          </Typography>
          <Badge badgeContent={3} color="secondary">
            <motion.div whileHover={{ scale: 1.2 }}>
              <NotificationsIcon style={{ marginLeft: '20px' }} />
            </motion.div>
          </Badge>

          {/* Cart Icon with Badge */}
          <Badge badgeContent={cartItemCount} color="secondary">
            <motion.div whileHover={{ scale: 1.2 }}>
              <ShoppingCartIcon style={{ marginLeft: '20px' }} onClick={handleCartOpen} />
            </motion.div>
          </Badge>

          {/* Profile Icon with Profile Picture */}
          <motion.div whileHover={{ scale: 1.2 }} onClick={onProfileClick} style={{ cursor: 'pointer' }}>
            <Avatar src="url_to_profile_picture" style={{ marginLeft: '20px' }} />
          </motion.div>
        </div>
      </Toolbar>
      <SecondaryNavbar />
    </AppBar>
  );
};

export default Navbar;
