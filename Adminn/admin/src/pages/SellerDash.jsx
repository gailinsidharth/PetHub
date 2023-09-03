import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

import { Box } from '@mui/material'
import SellerComponent from './SellerComponent';

   
const SellerDash = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebarVisibility = () => {
        setSidebarVisible((prevVisibility) => !prevVisibility);
      };
  return (
    <div>

{sidebarVisible && <Sidebar />} 
       <Box spacing={2} sx={{ marginLeft:23 }}>
       <Navbar onToggleSidebar={toggleSidebarVisibility} />
        <SellerComponent/>
    </Box>

    </div>
  )
}

export default SellerDash