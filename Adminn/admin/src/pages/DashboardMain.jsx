import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Linechart from './Linechart'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

import { Box } from '@mui/material'



const DashboardMain = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebarVisibility = () => {
    setSidebarVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div>
        {sidebarVisible && <Sidebar />} 
       <Box spacing={2} sx={{ marginLeft:20 }}>
       <Navbar onToggleSidebar={toggleSidebarVisibility} />
       <Dashboard/>
       <Linechart/>
    </Box>
    </div>
)
}

export default DashboardMain