import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../assets/img/pethom.jpg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BannerWrapper = styled('div')({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  objectFit: 'contain',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '20px',
});

const BannerContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  color: 'white',
  marginTop: 'auto',
  marginBottom: 'auto',
});

const MotionButton = motion(Button);

const BannerSection = () => {
  const navigate = useNavigate();

  const onClickRegister = () => {
    navigate('/signup');
  };

  return (
    <BannerWrapper>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="banner">
        <BannerContainer>
          <Typography variant="h3" component="h1" sx={{ marginBottom: '20px' }}>
            Pets Hub
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Welcome to PetsHub, the ultimate platform for all your pet care needs. We have designed a user-friendly website
            that integrates various services to enhance the pet ownership experience. With our holistic approach, we aim to
            bridge the gaps and overcome the limitations of the existing systems.
          </Typography>
          <MotionButton
            onClick={onClickRegister}
            variant="contained"
            color="primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </MotionButton>
        </BannerContainer>
      </motion.div>
    </BannerWrapper>
  );
};

export default BannerSection;
