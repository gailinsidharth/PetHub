import React, { useState, useEffect } from 'react';
import { Container, List, ListItem } from '@mui/material';
import { axiosInstance } from '../utils/interceptors';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductListingPage from './ProductListingPage';



const SubcategoryList = ({subcategoryid}) => {
  const [subcategories, setSubcategories] = useState([]);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/getcategorybyid/${subcategoryid}`)
      .then((response) => {
        setSubcategories(response.data.subCategories);
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
      });
  }, [categoryId]);

  const handleSubcategoryClick = (subcategory) => {
    // Navigate to the ProductList component with the selected subcategory ID
    navigate(`/subcategory/${encodeURIComponent(subcategory)}`);
  };

  console.log('passed data',subcategoryid)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  
      
        
        <List
          sx={{
            padding: 0,
            color: '#557455',
          }}
        >
          <Container Width='ls' sx={{display:'flex',justifyContent:'space-between',boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',border:'beige',  backgroundColor:'#f0b4b4', marginTop:'50px',marginBottom:'20px'}}>
          
          {subcategories.map((subcategory, index) => (
            <ListItem
              key={subcategory}
              onClick={() => handleSubcategoryClick(subcategory)}
              sx={{ cursor: 'pointer' }}
            >
              {index < subcategories.length - 1 ? `${subcategory}` : subcategory}
            </ListItem>
          ))}

           </Container>
        </List>
        
     
   
    </div>
  );
};

export default SubcategoryList;
