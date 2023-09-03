import React from 'react';
import { Container, Grid, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/img/contactus.jpg';

const ContactUsWrapper = styled('div')({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const ContactUsContent = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
});

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionTextField = motion(TextField);

export const ContactUs = () => {
  return (
    <ContactUsWrapper className="contact-us">
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <ContactUsContent className="contact-us-content">
              <MotionTypography variant="h4" component="h2" className="contact-us-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                Contact Us
              </MotionTypography>
              <MotionTypography variant="body1" className="contact-us-description" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                Have any questions or suggestions? We'd love to hear from you! Reach out to us using the contact information below or fill out the form, and we'll get back to you as soon as possible.
              </MotionTypography>
              <div className="contact-us-details">
                <div className="contact-us-info">
                  <Typography component="span" variant="body2" className="contact-us-label">
                    Email:
                  </Typography>
                  <Typography component="span" variant="body2" className="contact-us-value">
                    info@petshub.com
                  </Typography>
                </div>
                <div className="contact-us-info">
                  <Typography component="span" variant="body2" className="contact-us-label">
                    Phone:
                  </Typography>
                  <Typography component="span" variant="body2" className="contact-us-value">
                    123-456-7890
                  </Typography>
                </div>
                <div className="contact-us-info">
                  <Typography component="span" variant="body2" className="contact-us-label">
                    Address:
                  </Typography>
                  <Typography component="span" variant="body2" className="contact-us-value">
                    123 Main Street, City, Country
                  </Typography>
                </div>
              </div>
              <form className="contact-us-form">
                <MotionTextField variant="outlined" type="text" placeholder="Name" sx={{ marginBottom: '1rem' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} />
                <MotionTextField variant="outlined" type="email" placeholder="Email" sx={{ marginBottom: '1rem' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} />
                <MotionTextField variant="outlined" multiline rows={5} placeholder="Message" sx={{ marginBottom: '1rem' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} />
                <MotionButton variant="contained" color="primary" className="contact-us-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                  Submit
                </MotionButton>
              </form>
            </ContactUsContent>
          </Grid>
        </Grid>
      </Container>
    </ContactUsWrapper>
  );
};
