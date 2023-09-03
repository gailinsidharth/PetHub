import React from 'react';
import { motion } from 'framer-motion';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductsContainer = () => {

    const navigate = useNavigate();

    const onAddProduct = ()=>{
        navigate('/addproduct')
    }

    const onCancel = ()=>{
        navigate('/product')
    }
  return (
    <Container maxWidth="lg" >
      {/* Title Container */}
      <Box mt={4} display="flex" alignItems="center">
        <Typography variant="h4">Products</Typography>
      </Box>

    
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{display:'flex',gap:'10px'}}
      >
        <Box mt={2} display="flex" >
          {/* Add Product Button */}
          <Button variant="contained" color="primary" onClick={onAddProduct}>
            Add Product
          </Button>
          
        </Box>

        <Box mt={2} display="flex" >
          
          
        </Box>

      </motion.div>
    </Container>
  );
};

export default ProductsContainer;
