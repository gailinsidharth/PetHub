import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

import { Box } from '@mui/material'
import BreederComponent from './BreederComponent'

const BreederDash = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebarVisibility = () => {
        setSidebarVisible((prevVisibility) => !prevVisibility);
      };
  return (
    <div>
        {sidebarVisible && <Sidebar />} 
       <Box spacing={2} sx={{ marginLeft:23 }}>
       <Navbar onToggleSidebar={toggleSidebarVisibility} />
        <BreederComponent/>
    </Box>
    </div>
  )
}

export default BreederDash