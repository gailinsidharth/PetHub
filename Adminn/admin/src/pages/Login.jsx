import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';

import adminbg from '../assets/image/adminbg.jpg'; 
import { axiosInstance } from '../utils/interceptors';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {

  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting }) => {
     await axiosInstance('/adminlogin',{
      method:'POST',
      data:values
     })
      navigate('/dash')
    console.log(values);
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        height: '100vh',
        width:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url(${adminbg}) no-repeat center center fixed`,
        backgroundSize: 'cover',
      }}
    >
 <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
             
            </Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form style={{ width: '100%', marginTop: 8 }}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      helperText={<ErrorMessage name="email" component="div" style={{ color: 'red' }} />}
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      helperText={<ErrorMessage name="password" component="div" style={{ color: 'red' }} />}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ marginY: 3 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <Typography component="p" variant="body2" sx={{ textAlign: 'center' }}>
                      <Link href="#" variant="body2">
                        Forgot your password?
                      </Link>
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ textAlign: 'center' }}>
                      <Link href="#" variant="body2">
                        Create account
                      </Link>
                    </Typography>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  );
}

export default Login;
