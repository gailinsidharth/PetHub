import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { AddShoppingCart } from '@mui/icons-material';

const SmallProductContainer = () => {
  
  return (
    <motion.div
      className="small-product-container"
      whileHover={{ scale: 1.05, boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.2)' }}
      style={{ width: '200px', height: '300px' }} // Adjust size as needed
    > 
    
      
    </motion.div>
  );
};

// Dummy product data from the backend
const dummyProductFromBackend = {
  name: 'Sample Product',
  price: 29.99,
  image: 'product.jpg', // Replace with actual image URL from backend
};

export default SmallProductContainer;
