import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';


const FeaturesWrapper = styled('div')({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const FeaturesContainer = styled(Container)({
  color: 'white',
  textAlign: 'center',
  margin: '25px',
});

const FeatureContainer = styled(Container)({
  margin: '5rem 0',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const MotionTypography = motion(Typography);

export const FeaturesSection = () => {
  return (
    <FeaturesWrapper className="features">
      <div>
        <FeaturesContainer>
          <MotionTypography variant="h4" className="mb-3" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
            Our Services
          </MotionTypography>
          <MotionTypography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
            In PetsHub, we offer a wide range of services to cater to all your pet care needs. Our platform is designed to provide a seamless experience for pet owners, breeders, pet shops, and veterinary doctors. Here are some of the key services we offer: By offering these comprehensive services, PetsHub aims to simplify the pet ownership experience, promote responsible breeding practices, and ensure that pets receive the best care possible. We strive to create a user-centric platform that connects pet owners, breeders, pet shops, and veterinary professionals, fostering a vibrant and caring pet community.
          </MotionTypography>
        </FeaturesContainer>
        <FeatureContainer>
          <Container className="my-5 featureContainer">
            <MotionTypography variant="h4" className="mt-4" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
              Breeding Services
            </MotionTypography>
            <MotionTypography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}>
              At PetsHub, we have a diverse community of responsible breeders. Breeders can create an account and showcase their expertise and available pets. They can list their pets for sale, ensuring that pet owners can find a healthy and well-cared-for companion for their family.
            </MotionTypography>
          </Container>
          {/* Additional FeatureContainers */}
        </FeatureContainer>
      </div>
    </FeaturesWrapper>
  );
};
