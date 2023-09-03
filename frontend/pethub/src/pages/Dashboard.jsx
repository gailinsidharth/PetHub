import React from 'react';
import { motion } from 'framer-motion';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import { Dashboard as DashboardIcon, Assignment as AssignmentIcon, Person as PersonIcon, Lock as LockIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleItemClick = (route) => {
    navigate(route);
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: '30%',
        left: '40px',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        background: 'white',
      }}
    >
      <Box p={2}>
        <List>
          <ListItem onClick={() => handleItemClick('/userdash')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleItemClick('/userdash')}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleItemClick('/update-profile')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Update Profile" />
          </ListItem>
          <Divider />
         
          <ListItem button onClick={() => handleItemClick('/')}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </motion.div>
  );
};

export default Dashboard;
