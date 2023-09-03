import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

import { Box } from '@mui/material'
import OrderComponent from './OrderComponent'
const OrderDash = () => {

    const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebarVisibility = () => {
        setSidebarVisible((prevVisibility) => !prevVisibility);
      };

  return (
    <div>
        {sidebarVisible && <Sidebar />} 
       <Box spacing={2} sx={{ marginLeft:23 }}>
       <Navbar onToggleSidebar={toggleSidebarVisibility} />
        <OrderComponent/>
    </Box>
    </div>
  )
}

export default OrderDash