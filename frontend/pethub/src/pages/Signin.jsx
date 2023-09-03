import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/images/1.jpg';
import { axiosInstance } from '../utils/interceptors';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance('/login', {
        method: 'POST',
        data: formData,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);

      setFormData({
        email: '',
        password: '',
      });

      navigate('/pethom');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="signin-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h4" align="center">
              Sign In
            </Typography>
            <form onSubmit={onSubmitChange}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: '16px' }}
              >
                Sign In
              </Button>
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
              Don't have an account?{' '}
              <MuiLink component={Link} to="/signup">
                Sign up
              </MuiLink>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </motion.div>
  );
};

export default Signin;
