import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton, Divider, Avatar, Typography, Box, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';
import { Close, Delete, ShoppingCart, AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { axiosInstance } from '../utils/interceptors'; // Assuming this is where your axios instance is defined
import { useNavigate } from 'react-router-dom';

const SidebarCart = ({ open, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
   
  const navigate = useNavigate()
  useEffect(() => {
    if (open) {
      fetchCartData();
    }
  }, [open]);

  const fetchCartData = async () => {
    try {
      const response = await axiosInstance.get('/cart'); // Replace with your API endpoint
      const cartData = response.data;

      // Calculate total amount using reduce
      const totalAmount = cartData.items.reduce((total, item) => total + parseFloat(item.product.productPrice.replace(',', ''))  * item.quantity, 0);

      setTotalAmount(totalAmount);
      setCartItems(cartData.items);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.post('/remove-from-cart', { productId }); // Replace with your API endpoint
      fetchCartData(); // Update cart data after removal
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const ProceedToCheckout = ({ totalAmount }) => {
    navigate('/procedtocheck');
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '300px',
        background: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        overflowY: 'auto',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 9999,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="1rem">
        <IconButton onClick={onClose} style={{ background: '#4cd964', color: '#fff' }}>
          <Close />
        </IconButton>
        <Typography variant="h6" style={{ color: '#4cd964' }}>
          Shopping Cart
        </Typography>
        <IconButton disabled style={{ background: '#4cd964', color: '#fff' }}>
          <ShoppingCart />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {cartItems.map((item) => (
          <ListItem key={item._id} style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)' }}>
            <ListItemAvatar>
              <Avatar alt={item.product.title} src={item.product.image} />
            </ListItemAvatar>
            <ListItemText
              primary={item.product.title}
              secondary={`Quantity: ${item.quantity} - Price: $${parseFloat(item.product.productPrice.replace(',', ''))} - total: ${parseFloat(item.product.productPrice.replace(',', ''))*item.quantity}`}
              
              style={{ color: '#4cd964' }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" style={{ color: '#4cd964' }}>
                <RemoveCircleOutline />
              </IconButton>
              {item.quantity}
              <IconButton edge="end" style={{ color: '#4cd964' }}>
                <AddCircleOutline />
              </IconButton>
              <IconButton edge="end" style={{ color: 'red' }} onClick={() => removeFromCart(item.product._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box
        style={{
          background: '#4cd964',
          color: '#fff',
          padding: '1rem',
          marginTop: 'auto', // Push the container to the bottom of the sidebar
        }}
      >
        <Typography variant="h6" style={{ textAlign: 'center' }} onClick={ProceedToCheckout}>
          Proceed to Checkout
        </Typography>
        <Typography variant="body1" style={{ textAlign: 'center' }}>
          Total Amount: ${totalAmount}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          style={{ display: 'block', margin: '0 auto', marginTop: '1rem' }}
          onClick={ ()=>ProceedToCheckout()}
        >
          Checkout
        </Button>
      </Box>
    </motion.div>
  );
};

export default SidebarCart;
