import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Typography, TextField, Button, IconButton, MenuItem, Select } from '@mui/material';
import { RiCloseFill } from 'react-icons/ri';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../utils/interceptors';

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [details, setDetails] = useState('');
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const { handleImageUpload } = useContext(ImageContext);
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    axiosInstance.get('/getcategory').then((response) => {
      setCategories(response.data);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    multiple: false,
    accept: 'image/*',
    onDrop: (accepted) => {
      setAcceptedFiles(accepted);
    },
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory('');
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleDetailChange = (e) => {
    setDetails(e.target.value);
  };

  const handleProductQuantityChange = (e) => {
    setProductQuantity(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddProduct = async () => {
    try {
      const cloudinaryResponse = await handleImageUpload(acceptedFiles[0]);
      const imageURL = cloudinaryResponse.data.url;
      const selectedCategoryObj = categories.find((category) => category._id === selectedCategory);

      const newProduct = {
        title: title,
        image: imageURL,
        category: selectedCategoryObj ? selectedCategoryObj.name : '',
        subCategory: selectedSubCategory,
        details: details,
        productPrice: productPrice,
        productQuantity: productQuantity,
      };

      const response = await axiosInstance.post('/addproduct', newProduct);

      if (response.status === 201) {
        toast.success('Product added successfully!', {
          position: 'top-center',
          autoClose: 2000,
        });

        newProduct = {
          title:'',
        image:'',
        category:'',
        subCategory:'',
        details:'',
        productPrice:'',
        productQuantity:'',
        }
      } else {
        toast.error('Error adding product. Please try again.', {
          position: 'top-center',
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" component="h1" align="center">
          Add Product
        </Typography>
        <IconButton color="primary" size="small" sx={{ float: 'right' }}>
          <RiCloseFill />
        </IconButton>
      </Box>

      <Box mt={4}>
        <Typography variant="subtitle1">Basic Info</Typography>
        <TextField fullWidth label="Product Title/Name" variant="outlined" margin="normal"  value={title} onChange={handleTitleChange}/>
        <TextField
          fullWidth
          label="Product Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={details}
          onChange={handleDetailChange}
        />

        <Box
          {...getRootProps()}
          sx={{
            border: '1px dashed #ccc',
            borderRadius: '4px',
            p: 2,
            textAlign: 'center',
            cursor: 'pointer',
            mt: 2,
            ...(isDragActive && { borderColor: 'primary.main' }),
            ...(isDragAccept && { borderColor: 'success.main' }),
            ...(isDragReject && { borderColor: 'error.main' }),
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography color="primary">Drop the image here</Typography>
          ) : (
            <Typography>Drag your images here or click to browse</Typography>
          )}
        </Box>
        {acceptedFiles.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Uploaded Image:</Typography>
            <img
              src={URL.createObjectURL(acceptedFiles[0])}
              alt="Uploaded Product"
              style={{ maxWidth: '100%', marginTop: '8px' }}
            />
          </Box>
        )}
      </Box>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Category</Typography>
        <Typography variant="subtitle1">SubCategory</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          fullWidth
          variant="outlined"
          margin="normal"
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

        {selectedCategory && (
          <Select
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            fullWidth
            variant="outlined"
            margin="normal"
            label="Subcategory"
          >
            {categories
              .find((category) => category._id === selectedCategory)
              ?.subCategories.map((subCategory) => (
                <MenuItem key={subCategory} value={subCategory}>
                  {subCategory}
                </MenuItem>
              ))}
          </Select>
        )}
      </Box>
      <Typography variant="subtitle1">Product Price</Typography>

      <TextField
          variant="outlined"
          size="small"
          value={productPrice}
          onChange={handleProductPriceChange}
         
          margin="normal"
          label="Product Quantity"
        />

        <Typography variant="subtitle1">Product Quantity</Typography>
      <TextField
          variant="outlined"
          size="small"
          value={productQuantity}
          onChange={handleProductQuantityChange}
         
          margin="normal"
          label="Product Quantity"
        />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }} onClick={handleAddProduct}>
          Add
        </Button>
        <Button variant="contained" color="error" size="large" onClick={() => navigate('/product')}>
          Cancel
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default AddProduct;
