import React, { useState } from 'react'
import ProductsContainer from './ProductsContainer'
import ProductTable from './ProductTable'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

import { Box } from '@mui/material'

const ProductDash = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebarVisibility = () => {
      setSidebarVisible((prevVisibility) => !prevVisibility);
    };
  return (
  
     <div>
        {sidebarVisible && <Sidebar />} 
       <Box spacing={2} sx={{ marginLeft:23 }}>
       <Navbar onToggleSidebar={toggleSidebarVisibility} />
       <ProductsContainer/>
        <ProductTable/>
    </Box>
    </div>
        
  
  )
}

export default ProductDash