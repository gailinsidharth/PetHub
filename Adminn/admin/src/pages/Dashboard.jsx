import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import {
  TodayOutlined,
  DateRangeOutlined,
  TrendingUpOutlined,
  MonetizationOnOutlined,
  ShoppingCartOutlined,
  HourglassEmptyOutlined,
  PlaylistAddCheckOutlined,
  CheckCircleOutlineOutlined,
} from '@mui/icons-material';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ padding:5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fcaf17', color: 'white' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Today Orders
              </Typography>
              <Typography variant="h4">$0.00</Typography>
            </Box>
            <TodayOutlined fontSize="large" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#4caf50', color: 'white' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Yesterday Orders
              </Typography>
              <Typography variant="h4">$0.00</Typography>
            </Box>
            <DateRangeOutlined fontSize="large" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f50057', color: 'white' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                This Month
              </Typography>
              <Typography variant="h4">$1318.63</Typography>
            </Box>
            <TrendingUpOutlined fontSize="large" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#3f51b5', color: 'white' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                All-Time Sales
              </Typography>
              <Typography variant="h4">$3608.32</Typography>
            </Box>
            <MonetizationOnOutlined fontSize="large" />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#ff9800', color: 'white' }}>
            <ShoppingCartOutlined fontSize="large" />
            <Typography variant="h5">Total Orders</Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f44336', color: 'white' }}>
            <HourglassEmptyOutlined fontSize="large" />
            <Typography variant="h5">Orders Pending</Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#4caf50', color: 'white' }}>
            <PlaylistAddCheckOutlined fontSize="large" />
            <Typography variant="h5">Orders Processing</Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#00bcd4', color: 'white' }}>
            <CheckCircleOutlineOutlined fontSize="large" />
            <Typography variant="h5">Orders Delivered</Typography>
            <Typography variant="h4">0</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
