import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  ListItemButton,
} from '@mui/material';
import { DashboardOutlined, CategoryOutlined, PeopleOutlined,  StoreOutlined, DescriptionOutlined, ShoppingCartOutlined, ExpandLess, ExpandMore, LanguageOutlined, MonetizationOnOutlined, ExitToAppOutlined } from '@mui/icons-material';

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openInternational, setOpenInternational] = useState(false);
  
  const navigate = useNavigate()

  const onLogout = ()=>{
    navigate('/')
  }

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleCategoryClick = () => {
    setOpenCategory(!openCategory);
  };

 
  const sidebarWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlined />, link: '/dash' },
    { text: 'Catalog', icon: <CategoryOutlined />, onClick: handleCategoryClick },
    { text: 'Customers', icon: <PeopleOutlined />, link: '/customers' },
    { text: 'Breeders', icon: <PeopleOutlined />, link: '/breeder' },
    { text: 'Sellers', icon: <PeopleOutlined />, link: '/seller' },
    { text: 'Orders', icon: <ShoppingCartOutlined />, link: '/order' },
  ];

  const categoryItems = [
    { text: 'Products', icon: <DescriptionOutlined />, link: '/product' },
    { text: 'category', icon: <DescriptionOutlined />, link: '/category' },

    
  ];

 
  return (
   
    <Drawer variant="permanent" sx={{ width: sidebarWidth, flexShrink: 0 }}>
      <List disablePadding>
        <ListItem disableGutters sx={{ justifyContent: 'center', pt: 2, pb: 4 }}>
          <Typography variant="h6" sx={{color:'blue'}}>Pet Hub</Typography>
        </ListItem>
        <Divider />

        {menuItems.map((item) => (
          <motion.div
            key={item.text}
            whileHover={{ color: 'blue', scale: 1.05 }}
            whileTap={{ backgroundColor: 'inherit', scale: 0.95 }}
          >
            {item.onClick ? (
              <>
                <ListItemButton onClick={item.onClick} sx={{ pl: 3, pr: 2, py: 2 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.text === 'Catalog' && (openCategory ? <ExpandLess /> : <ExpandMore />)}
                  {item.text === 'International' && (openInternational ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={item.text === 'Catalog' ? openCategory : openInternational} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.text === 'Catalog' && (
                      categoryItems.map((subItem) => (
                        <motion.div
                          key={subItem.text}
                          whileHover={{ backgroundColor: '#f3f3f3', scale: 1.05 }}
                          whileTap={{ backgroundColor: '#f3f3f3', scale: 0.95 }}
                        >
                          <ListItem
                            button
                            component={Link}
                            to={subItem.link}
                            selected={selectedMenu === subItem.text}
                            onClick={() => handleMenuClick(subItem.text)}
                            sx={{ pl: 6, pr: 2, py: 2 }}
                          >
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItem>
                        </motion.div>
                      ))
                    )}
                    {item.text === 'International' && (
                      internationalItems.map((subItem) => (
                        <motion.div
                          key={subItem.text}
                          whileHover={{ backgroundColor: '#f3f3f3', scale: 1.05 }}
                          whileTap={{ backgroundColor: '#f3f3f3', scale: 0.95 }}
                        >
                          <ListItem
                            button
                            component={Link}
                            to={subItem.link}
                            selected={selectedMenu === subItem.text}
                            onClick={() => handleMenuClick(subItem.text)}
                            sx={{ pl: 6, pr: 2, py: 2 }}
                          >
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            <ListItemText primary={subItem.text} />
                          </ListItem>
                        </motion.div>
                      ))
                    )}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem
                button
                component={Link}
                to={item.link}
                selected={selectedMenu === item.text}
                onClick={() => handleMenuClick(item.text)}
                sx={{ pl: 3, pr: 2, py: 2 }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )}
          </motion.div>
        ))}
      </List>
      <Divider />
      <motion.div
        whileHover={{ backgroundColor: '#f3f3f3', scale: 1.05 }}
        whileTap={{ backgroundColor: '#f3f3f3', scale: 0.95 }}
      >
        <ListItem sx={{ pl: 3, pr: 2, py: 2 }} onClick={onLogout}>
          <ListItemIcon>
            <ExitToAppOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout"  />
        </ListItem>
      </motion.div>
    </Drawer>
  );
};

export default Sidebar;
