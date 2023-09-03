import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Container, TextField, Button } from '@mui/material';
import { axiosInstance } from '../utils/interceptors';
import { ImageContext } from '../context/ImageContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState([]); // Array to hold subcategory names
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleImageUpload } = useContext(ImageContext); // Use the handleImageUpload function from ImageContext

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubCategoryNameChange = (e) => {
    setSubCategoryName(e.target.value);
  };

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, subCategoryName]); // Add the new subcategory name to the array
    setSubCategoryName(''); // Clear the input field for the next subcategory
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleAddCategory = async () => {
    try {
      const cloudinaryResponse = await handleImageUpload(selectedImage);
      const imageURL = cloudinaryResponse.data.url;

      const newCategory = {
        name: categoryName,
        subCategories: subCategories, // Send the array of subcategory names to the back end
        image: imageURL,
      };

      const response = await axiosInstance.post('/category', newCategory);

      if (response.status === 201) {
        toast.success('Category uploaded successfully!', {
          position: 'top-center',
          autoClose: 2000,
        });
        console.log('Category created successfully!');
        setCategoryName('');
        setSubCategories([]); // Clear the array of subcategory names after successful submission
      } else {
        toast.error('Error creating category. Please try again.', {
          position: 'top-center',
          autoClose: 2000,
        });
        console.log('Error creating category');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-center',
        autoClose: 2000,
      });
      console.error('Error creating category:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Container maxWidth="sm" sx={{ marginTop: 20 }}>
        <h2>Add Category</h2>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
        <h2>Add SubCategory</h2>
        <TextField
          label="SubCategory"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subCategoryName}
          onChange={handleSubCategoryNameChange}
        />
        
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <label htmlFor="upload-image">
          <Button component="span" variant="contained" color="primary">
            Upload Image
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCategory}
          sx={{ marginLeft: 2 }}
        >
          Add Category
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSubCategory}
          sx={{ marginLeft: 2 }}
        >
          Add SubCategory
        </Button>
        <ul>
          {subCategories.map((subCategory, index) => (
            <li key={index} style={{listStyle:'none'}}>{subCategory}</li>
          ))}
        </ul>
      </Container>
      <ToastContainer />
    </motion.div>
  );
};

export default Category;
