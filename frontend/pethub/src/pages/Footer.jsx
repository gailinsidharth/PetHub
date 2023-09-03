import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <motion.footer style={{ background: '#f9f9f9', color: '#333', padding: '2rem 0' }}>
      <Container maxWidth="md">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" component="div" align="center" color="primary">
              Free Shipping From $500.00 
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" component="div" align="center" color="primary">
              Support 24/7 At Anytime
            </Typography>
          
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" component="div" align="center" color="primary">
              Secure Payment Totally Safe
            </Typography>
           
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" component="div" align="center" color="primary">
              Latest Offer Upto 20% Off
            </Typography>
          
          </Grid>
        </Grid>
        <Divider style={{ margin: '2rem 0' }} />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Company</Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Latest News</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Top Category</Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link href="#">Fish & Meat</Link>
              </li>
              <li>
                <Link href="#">Soft Drinks</Link>
              </li>
              <li>
                <Link href="#">Baby Care</Link>
              </li>
              <li>
                <Link href="#">Beauty & Health</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">My Account</Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link href="#">Dashboard</Link>
              </li>
              <li>
                <Link href="#">My Orders</Link>
              </li>
              <li>
                <Link href="#">Recent Orders</Link>
              </li>
              <li>
                <Link href="#">Updated Profile</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Contact Info</Typography>
            <Typography>
              987 Andre Plain Suite High Street 838, Lake Hestertown, USA
              <br />
              Tell: 02.356.1666
              <br />
              Email: ccruidk@test.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </motion.footer>
  );
};

export default Footer;
