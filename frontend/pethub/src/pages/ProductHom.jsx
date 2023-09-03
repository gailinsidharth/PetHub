import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  IconButton,
  Card,
  CardContent,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { AddShoppingCart, Remove, Add } from '@mui/icons-material';
import { axiosInstance } from '../utils/interceptors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductHom = () => {
  const [Categories, setCategories] = useState([]);
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axiosInstance
      .get('/getproduct')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCartClick = (product) => {
    setSelectedProduct(product);
    setShowQuantity(!showQuantity);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShowQuantity(false);
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post('/userCartAddToCart', {
        productId: selectedProduct._id,
        quantity,
      });
      setShowQuantity(false);
      setSelectedProduct(null);
      setQuantity(1);
      toast.success('Added to cart successfully!', { position: 'bottom-center' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Added to cart failed!', { position: 'bottom-center' });
    }
  };

  return (
    <motion.div style={{ background: '#f0f0f0', padding: '2rem' }}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center" gutterBottom>
          Choose your necessary products from these featured categories.
        </Typography>
        <Grid container spacing={2}  justifyContent='space-evenly'>
          {Categories.map((product) => (
            <Grid item xs={12} sm={6} md={4}  key={product.id}>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}
                style={{
                  width: '100%',
                  height: '280px', 
                  background: '#fff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Card style={{ Width: '500px', height:'400px', marginTop: '20px' }} key={product._id}>
                  <CardMedia
                    component="img"
                    src={product.image}
                    alt="Product"
                    style={{ width: '100%', maxHeight: '100px', objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => handleCartClick(product)}
                  />
                  <CardContent>
                    <Typography variant="body2">{product.title}</Typography>
                    <Typography variant="body2">
                      ${parseFloat(product.productPrice.replace(/[^\d.]/g, '')).toFixed(2)}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <IconButton color="primary" size="small" onClick={handleCartClick}>
                        <AddShoppingCart />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={selectedProduct !== null} onClose={handleClose} >
        {selectedProduct && (
          <>
            <DialogContent style={{width:'800px',height:'200px' }}>
              <div style={{ display: 'flex' }}>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  style={{
                    width: '150px',
                    height: '200px',
                    objectFit: 'contain',
                  }}
                />
                <div style={{ marginLeft: '20px', flex: 1 }}>
                  <Typography variant="h6">{selectedProduct.title}</Typography>
                  <Typography variant="p" style={{overflow:'hidden'}}>{selectedProduct.details}</Typography>
                  <Typography variant="body2">${parseFloat(selectedProduct.productPrice.replace(/[^\d.]/g, '')).toFixed(2)}</Typography>
                  {showQuantity && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button size="small" variant="outlined" onClick={handleDecrease}>
                        <Remove fontSize="small" />
                      </Button>
                      <Typography variant="body2">{quantity}</Typography>
                      <Button size="small" variant="outlined" onClick={handleIncrease}>
                        <Add fontSize="small" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              <Button onClick={handleAddToCart} color="primary">
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <ToastContainer />
    </motion.div>
  );
};

export default ProductHom;
