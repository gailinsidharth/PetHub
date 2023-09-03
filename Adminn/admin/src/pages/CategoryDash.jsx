import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

import { Box } from '@mui/material'
import Category from './Category'

const CategoryDash = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebarVisibility = () => {
      setSidebarVisible((prevVisibility) => !prevVisibility);
    };
  
  return (
 
          <div>
        {sidebarVisible && <Sidebar />} 
       <Box spacing={2} sx={{ marginLeft:20 }}>
       <Navbar onToggleSidebar={toggleSidebarVisibility} />
        <Category/>
    </Box>
    </div>
  
  )
}

export default CategoryDash