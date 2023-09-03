// ImageContext.js (React Context)

import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState('');

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'profile_pic');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/gailin/image/upload',
        formData
      );

      
      console.log(response,'==response')

      return response
     
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <ImageContext.Provider value={{ image, handleImageUpload ,setImage}}>
      {children}
    </ImageContext.Provider>
  );
};


