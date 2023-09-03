import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowDropDown } from '@mui/icons-material';
import axios from 'axios';
import { axiosInstance } from '../utils/interceptors';

const SecondaryNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend using Axios here
    axiosInstance.get('/getcategory')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky"  style={{  height: '40px', zIndex: 100,boxShadow: 'none' ,backgroundColor:"#fff"}}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', minHeight: 'unset', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            aria-controls="category-menu"
            aria-haspopup="true"
            onClick={handleCategoryMenuOpen}
            color="inherit"
            style={{ color: 'black', fontSize: '14px', textTransform: 'none' }}
          >
            Categories <ArrowDropDown/>
          </Button>
          <Menu
            id="category-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCategoryMenuClose}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} onClick={handleCategoryMenuClose}>
                {category.name}
              </MenuItem>
            ))}
          </Menu>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Button color="inherit" style={{ color: 'black', fontSize: '14px', textTransform: 'none' }}>About Us</Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Button color="inherit" style={{ color:'black', fontSize: '14px', textTransform: 'none' }}>Contact Us</Button>
          </motion.div>
        </div>

        {/* Secondary Navbar - Right Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Links */}
          
          <motion.div whileHover={{ scale: 1.2 }}>
            <Button color="inherit" style={{ color: 'black', fontSize: '14px', textTransform: 'none' }}>Privacy Policy</Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Button color="inherit" style={{ color: 'black', fontSize: '14px', textTransform: 'none' }}>Terms and Conditions</Button>
          </motion.div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default SecondaryNavbar;
