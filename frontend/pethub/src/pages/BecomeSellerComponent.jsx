import React from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck, faBackward } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/img/sellerbgr.jpg';

const BGContainer = {
  backgroundColor: '#f0f0f0',
  paddingTop: '50px',
  paddingBottom: '50px',
};

const SectionStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const MotionButton = motion(Button);
const MotionFontAwesomeIcon = motion(FontAwesomeIcon);

const BecomeSellerComponent = () => {
  const formalSellers = [
    {
      id: 1,
      name: 'John Doe',
      photo: backgroundImg,
      comment: "I've had great success selling on this platform. Highly recommended!",
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo: 'seller2.jpg',
      comment: 'Being a seller here has been a game-changer for my business. Fantastic support!',
    },
    {
      id: 3,
      name: 'Jane Smith',
      photo: 'seller2.jpg',
      comment: 'Being a seller here has been a game-changer for my business. Fantastic support!',
    },
  ];

  const navigate = useNavigate();

  const onRegisterBreeder = () => {
    navigate('/registerbreeder');
  };

  const onRegisterSeller = () => {
    navigate('/registerasseller');
  };

  const onBreederLogin = () => {
    navigate('/breederlogin');
  };

  const onSellerLogin = () => {
    navigate('/sellerlogin');
  };

  const onGoBack = () => {
    navigate('/');
  };

  return (
    <div style={BGContainer}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <MotionButton
                  onClick={onGoBack}
                  variant="contained"
                  color="secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MotionFontAwesomeIcon icon={faBackward} /> Go Back
                </MotionButton>
              </Grid>
              <Grid item>
                <MotionButton
                  onClick={onSellerLogin}
                  variant="contained"
                  color="primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{ marginRight: '10px' }}
                >
                  <MotionFontAwesomeIcon icon={faUser} /> Seller Login
                </MotionButton>
                <MotionButton
                  onClick={onBreederLogin}
                  variant="contained"
                  color="primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MotionFontAwesomeIcon icon={faUser} /> Breeder Login
                </MotionButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={SectionStyle}>
              <Typography variant="h4" gutterBottom>
                Become a Seller
              </Typography>
              <Typography variant="body1" gutterBottom>
                Start selling your products on our platform and reach millions of customers. Register now to become a seller and unlock a world of opportunities.
              </Typography>
              <MotionButton onClick={onRegisterSeller} variant="contained" color="primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Register Now
              </MotionButton>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={SectionStyle}>
              <Typography variant="h4" gutterBottom>
                Become a Breeder
              </Typography>
              <Typography variant="body1" gutterBottom>
                Join our platform as a breeder and connect with pet lovers. Start breeding high-quality pets and gain recognition in the community.
              </Typography>
              <MotionButton onClick={onRegisterBreeder} variant="contained" color="primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Register Now
              </MotionButton>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={SectionStyle}>
              <Typography variant="h4" gutterBottom>
                Why Sell on Our Platform?
              </Typography>
              <ul>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> Access to a vast customer base
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> Flexible selling options
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> Secure payment and order fulfillment
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> Seller support and analytics
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> And much more!
                  </Typography>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={SectionStyle}>
              <Typography variant="h4" gutterBottom>
                Why Become a Breeder?
              </Typography>
              <ul>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> Connect with pet lovers and enthusiasts
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> Breed high-quality and healthy pets
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> Gain recognition in the pet breeding community
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> Breeder support and resources
                  </Typography>
                </li>
                <li>
                  <Typography>
                    <FontAwesomeIcon icon={faCheck} /> And much more!
                  </Typography>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={SectionStyle}>
              <Typography variant="h4" gutterBottom>
                How to Get Started
              </Typography>
              <ol>
                <li>
                  <Typography>Create a seller/breeder account</Typography>
                </li>
                <li>
                  <Typography>Add your products/pets to the catalog</Typography>
                </li>
                <li>
                  <Typography>Set competitive prices</Typography>
                </li>
                <li>
                  <Typography>Manage your inventory</Typography>
                </li>
                <li>
                  <Typography>Start receiving orders and fulfill them</Typography>
                </li>
              </ol>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BecomeSellerComponent;
