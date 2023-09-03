import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid} from '@mui/material';
import { Link ,useNavigate} from 'react-router-dom';
import { axiosInstance } from '../utils/interceptors';



const BannerContainer = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    axiosInstance
      .get('/getcategory')
      .then((response) => {
        setFeaturedCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);
 
  
 
  return (
    <motion.div style={{ background: '#f0f0f0', padding: '2rem' }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Featured Categories
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Choose your necessary products from these featured categories.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {featuredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={category.id}>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}
                style={{
                  width: '100%',
                  height: '260px', // Increased the height for larger containers
                  background: '#fff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} // Increased width and height
                />
                <Link to={`/product/${encodeURIComponent(category.name)}`} style={{ textDecoration: 'none', color: 'inherit' ,marginTop: '5px',}} > 
                  <Typography variant="p" align="center" style={{  color: '#599964' }}  >
                    {category.name}   
                  </Typography>
                </Link>
                
               
              </motion.div>
            </Grid>

          ))}
        </Grid>
         
       
      
      </Container>
    </motion.div>
  );
};

export default BannerContainer;
