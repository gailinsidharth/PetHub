import React from 'react';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PetsIcon from '@mui/icons-material/Pets';

const MotionAppBar = motion(AppBar);

const Header = () => {
  return (
    <MotionAppBar
      color="primary"
      position="sticky"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      elevation={0}
    >
      <Container>
        <Toolbar className="d-flex justify-content-between align-items-center">
          <Typography
            component={Link}
            to="/"
            variant="h6"
            color="inherit"
            sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <PetsIcon sx={{ marginRight: '5px', fontSize: '1.8rem' }} />
            PetsHub
          </Typography>
          <nav>
            <Button component={Link} to="/sign" color="inherit" variant="text" sx={{ textDecoration: 'none', fontWeight: 600 }}>
              SignIn
            </Button>
            <Button
              component={Link}
              to="/becomesellerorbreeder"
              color="inherit"
              variant="text"
              sx={{ textDecoration: 'none', fontWeight: 600 }}
            >
              Breeding Services
            </Button>
            <Button
              component={Link}
              to="/products"
              color="inherit"
              variant="text"
              sx={{ textDecoration: 'none', fontWeight: 600 }}
            >
              Pet Shop
            </Button>
          </nav>
        </Toolbar>
      </Container>
    </MotionAppBar>
  );
};

export default Header;
