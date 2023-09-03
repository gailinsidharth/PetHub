import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { axiosInstance } from '../utils/interceptors';
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    // Fetch products based on selected subcategory (categoryId)
    axiosInstance.get(`/getProductsBySubcategory/${categoryId}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [categoryId]);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        Products for Selected Subcategory
      </Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={product.title}
                  height="140"
                  image={product.image}
                />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.details}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {product.productPrice}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
