import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/interceptors';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const StyledContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  });
  
  const StyledForm = styled('form')({
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  });
  
  const InputContainer = styled(FormControl)({
    marginBottom: '20px',
    width: '100%',
  });
  
  const ButtonGroup = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  });
  
  const RegisterAsSeller = () => {
    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      bankName: '',
      accountNumber: '',
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
        const response = await axiosInstance.post('/seller', {
          method: 'POST',
          data: formData,
        });
  
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          bankName: '',
          accountNumber: '',
        });
  
        navigate('/sellerlogin');
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleCancel = () => {
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        bankName: '',
        accountNumber: '',
      });
  
      navigate('/becomesellerorbreeder');
    };
  
    return (
      <div  style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #67B26F, #4ca2cd)',
      }}>
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit}>
          <h2>Register as Seller</h2>
          <InputContainer>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              id="firstName"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              id="lastName"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="bankName">Bank Name</InputLabel>
            <Input
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="accountNumber">Account Number</InputLabel>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </InputContainer>
          <ButtonGroup>
            <Button color="primary" type="submit">
              Register
            </Button>
            <Button color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </StyledForm>
      </StyledContainer>
      </div>
    );
  };
  
  export default RegisterAsSeller;