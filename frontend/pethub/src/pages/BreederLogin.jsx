import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Input, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/interceptors';

const BreederLogin = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axiosInstance.post('/breederlogin', formData);
  
        const { token } = response.data;
  
        localStorage.setItem('token', token);
  
        setFormData({
          email: '',
          password: '',
        });
  
        navigate('/breederdashboard');
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleCancel = () => {
      setFormData({
        email: '',
        password: '',
      });
  
      navigate('/becomesellerorbreeder');
    };
  
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #67B26F, #4ca2cd)',
        }}
      >
        <Card style={{ width: '400px', padding: '20px', borderRadius: '10px' }}>
          <CardContent>
            <Typography variant="h4" style={{ marginBottom: '20px', color: '#333' }}>
              Login as Breeder
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl style={{ marginBottom: '20px' }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl style={{ marginBottom: '20px' }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default BreederLogin;