import React from 'react';
import { Container, Grid } from '@mui/material';
import SmallProductContainer from './SmallProductContainer';

const ProductsList = () => {

    const products = [
        {
          id: 1,
          name: 'Product 1',
          price: 19.99,
          image: 'product1.jpg', // Replace with actual image URL
        },
        {
          id: 2,
          name: 'Product 2',
          price: 29.99,
          image: 'product2.jpg', // Replace with actual image URL
        },
        // Add more products as needed
      ];
    

  return (
    <Container maxWidth="md">
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={6} sm={4} md={3} key={product.id}>
              <SmallProductContainer  product={{
    id: 1,
    name: 'Product 1',
    price: 19.99,
    image: 'product1.jpg', // Replace with actual image URL
  }} />
        </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductsList