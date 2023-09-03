import React, { createContext, useState, useEffect } from 'react';
import { axiosInstance } from '../utils/interceptors';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  


 
 
  return (
    <CartContext.Provider
      value={{
        
       
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
