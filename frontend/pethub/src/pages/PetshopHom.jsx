import React, { useState } from 'react';
import BannerContainer from './BannerContainer'
import Navbar from './Navbar'
import PopularBreedsForAdoption from './PopularBreedsForAdoption'
import Footer from './Footer'
import SidebarCart from './SidebarCart';

const PetshopHom = () => {

    const [cartOpen, setCartOpen] = useState(false);

    const handleCartOpen = () => {
      setCartOpen(true);
    };
  
    const handleCartClose = () => {
      setCartOpen(false);
    };

  return (
    <div>
        <Navbar handleCartOpen={handleCartOpen}/>
        <BannerContainer/>
        <PopularBreedsForAdoption/>
        <Footer/>
        <SidebarCart open={cartOpen} onClose={handleCartClose} />

    </div>
  )
}

export default PetshopHom