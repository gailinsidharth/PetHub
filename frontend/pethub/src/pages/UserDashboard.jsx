import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Dashboard as DashboardIcon, Cancel as CancelIcon, ShoppingBasket as ShoppingBasketIcon } from '@mui/icons-material';
import { red, teal, grey } from '@mui/material/colors';

const UserDashboard = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="sm" style={{ marginTop: '50px' }}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          
          <Paper elevation={3} style={{ padding: '20px', background: grey[100], borderRadius: '10px', flex: 1, marginLeft: '10px' }}>
            <Typography variant="h6">
              <ShoppingBasketIcon fontSize="large" style={{ color: teal[500], marginRight: '10px' }} />
              Total Orders
            </Typography>
            <Typography variant="h6" style={{ color: teal[500] }}>
              242
            </Typography>
          </Paper>
          <Paper elevation={3} style={{ padding: '20px', background: grey[100], borderRadius: '10px', flex: 1, marginLeft: '10px' }}>
            <Typography variant="h6">
              <CancelIcon fontSize="large" style={{ color: red[500], marginRight: '10px' }} />
              Cancelled Orders
            </Typography>
            <Typography variant="h6" style={{ color: red[500] }}>
              76
            </Typography>
          </Paper>
        </Box>
      </Container>
    </motion.div>
  );
};

export default UserDashboard;
