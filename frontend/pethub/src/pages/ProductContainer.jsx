import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Button, Grid } from '@mui/material';
import { AddShoppingCart, Remove, Add } from '@mui/icons-material';
import { axiosInstance } from '../utils/interceptors';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const ProductContainer = () => {
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [subcategories, setSubcategories] = useState([]);
  const { subcategory } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/getProductsBySubcategory/${subcategory}`)
      .then((response) => {
        setSubcategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
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

  const addToCart = async (productId) => {
    try {
      await axiosInstance.post('/userCartaddtocart', { productId, quantity });
      setShowQuantity(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleCartClick = (productId) => {
    if (!showQuantity) {
      setShowQuantity(true);
    } else {
      addToCart(productId);
    }
  };

  return (
    <div style={{width:'100%',height:'100vh'}}>
      <Navbar />
      <Grid container spacing={5} justifyContent="center" style={{ padding: '50px' }}>
        {subcategories.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={product._id}>
            <Card
              style={{
                width: '200px', // Fixed width
                height: '280px', // Fixed height
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column', // Align items vertically
              }}
            >
              <CardMedia
                component="img"
                src={product.image}
                alt="Product"
                style={{ flex: '1', objectFit: 'contain' ,width:'150px',height:'100px'}} // Take remaining vertical space
              />
              <CardContent>
                <Typography variant="body2">${product.title}</Typography>
                <Typography variant="body2">${parseFloat(product.productPrice.replace(/[^\d.]/g, '')).toFixed(2)}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                  <IconButton color="primary" size="small" onClick={() => handleCartClick(product._id)}>
                    <AddShoppingCart />
                  </IconButton>
                  {showQuantity && (
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '4px' }}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductContainer;
