import React, { useState } from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import SidebarCart from './SidebarCart';
import Dashboard from './Dashboard';
import UserDashboard from './UserDashboard';
import OrderComponent from './OrderComponent';
import AddressCard from './AddressCard';


const UserHom = () => {

    const [cartOpen, setCartOpen] = useState(false);
    const [showAddresses, setShowAddresses] = useState(false); // State for showing addresses

    const handleCartOpen = () => {
      setCartOpen(true);
    };
  
    const handleCartClose = () => {
      setCartOpen(false);
    };

    const handleUpdateProfileClick = () => {
        setShowAddresses(true); // Show addresses when "Update Profile" is clicked
      };

  return (
    <div>
              <Navbar handleCartOpen={handleCartOpen}/>
               <Dashboard onProfileUpdateClick={handleUpdateProfileClick}/>
               <UserDashboard/>
               <OrderComponent/>
               {showAddresses && <AddressCard address={address} />}
              <Footer/>
            <SidebarCart open={cartOpen} onClose={handleCartClose} />
    </div>
  )
}

export default UserHom