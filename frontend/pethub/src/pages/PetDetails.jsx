import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Paper,
  Grid,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { LocationOn, ContactMail } from '@mui/icons-material';
import { axiosInstance } from '../utils/interceptors';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'
import { styled } from '@mui/material/styles';
import SidebarCart from './SidebarCart';
import { Button } from 'antd';

const StyledContainer = styled(Container)({
    marginTop:'80px'
  });
  
  const StyledPaper = styled(Paper)({
    padding: '2rem',
    display: 'flex',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  });
  
  const ImageContainer = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    maxWidth: '60%', // Adjust the size of the image container
    marginRight: '2rem', // Add some spacing between image and details
  });
  
  const Image = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
  });
  
  const DetailsContainer = styled(Grid)({
    flexGrow: 1, // Allow the details container to take up remaining space
    paddingLeft: '2rem',
  });
  
  const SellerDetails = styled(Grid)({
    paddingTop: '1rem',
  });
  
  const ContactBox = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '1rem',
  });
  


const PetDetails = () => {
    const [petData, setPetData] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);
    const {petId} = useParams() 

    const handleCartOpen = () => {
      setCartOpen(true);
    };
  
    const handleCartClose = () => {
      setCartOpen(false);
    };

    useEffect(() => {
       
       fetchData()
      }, []);


      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/viewpetById/${petId}`); 
          const data = response.data;
          setPetData(data);

             const sellerId = data.sellerId;
           
            const sellerResponse = await axiosInstance.get(`/getsellerdetails/${sellerId}`);
             
             setSeller(sellerResponse.data)
             setLoading(false);

          

          
        } catch (error) {
          setLoading(false);

          console.error('Error fetching data:', error);
        }
      };
  
   
      console.log(seller,'==seller')



  if (!petData) {
    return <p>Loading...</p>;
  }

  const { breed, description, category, age, certifiedPet, price, imageUrl, sellerId } = petData;
  const sellerDetails = {
    name: 'John Doe',
    location: 'New York, USA',
    email: 'john@example.com',
  };

  const handleContactSeller = () => {
    // Implement your contact logic here
  };

  return (

    <div>
        <Navbar handleCartOpen={handleCartOpen}/>
        <SidebarCart open={cartOpen} onClose={handleCartClose} />
     
    <StyledContainer>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <StyledPaper>
        <ImageContainer item xs={12} sm={6}>
          <Image src={imageUrl} alt={breed}  style={{ width: '400px' }}/>
        </ImageContainer>
        <DetailsContainer item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            {breed}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1">Category: {category}</Typography>
          <Typography variant="subtitle1">Age: {age}</Typography>
          <Typography variant="subtitle1">
            Certified Pet: {certifiedPet ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: ${price}
          </Typography>
          <SellerDetails>
            <Typography variant="h6">Seller Details</Typography>
            {seller && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Name: {seller.firstname} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    email: {seller.email} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seller Since: {seller.joinedDate}
                  </Typography>
                </>
              )}
          </SellerDetails>
          <ContactBox>
            <Typography variant="subtitle2">
              Contact me for details and price adjustment:
            </Typography>

            <Button
                type="default"
                onClick={() => {
                  const whatsappMessage = `Hello `;
                  window.open(`https://wa.me/${9074427659}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                }}
              >
                Write Message
              </Button> 
            <IconButton
              color="primary"
              aria-label="contact-seller"
              onClick={handleContactSeller}
            >
             
            </IconButton>
          </ContactBox>
        </DetailsContainer>
      </StyledPaper>
    </motion.div>
  </StyledContainer>
  </div>
  )
}

export default PetDetails