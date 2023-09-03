import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
  useTheme,

} from '@mui/material';
import {
  MenuOutlined,
  Brightness4Outlined,
  Brightness7Outlined,
  NotificationsOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';

const Navbar = ({ onToggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { theme, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log('Current theme mode:', theme.palette.mode);


  return (
    <>
      <AppBar position="sticky" >
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" >
              <MenuOutlined />
            </IconButton>
          )}
           <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onToggleSidebar}>
            <MenuOutlined />
          </IconButton>
          </Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            
          </Typography>
          
          <IconButton color="inherit" onClick={toggleTheme}>
          {theme.palette.mode === 'light' ? (
            <Brightness4Outlined />
          ) : (
            <Brightness7Outlined />
          )}
        </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar src="/profpic.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <motion.div
          whileHover={{ backgroundColor: 'primary', scale: 1.05 }}
          whileTap={{ backgroundColor: 'primary', scale: 0.95 }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            Profile
          </MenuItem>
        </motion.div>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default Navbar;
