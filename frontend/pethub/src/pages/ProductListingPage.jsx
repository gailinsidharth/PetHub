import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, TextField, Modal } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { axiosInstance } from '../utils/interceptors';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/system';
import { Card, CardContent } from '@mui/material';
import SidebarCart from './SidebarCart';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const { category } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/products/${category}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    const currentQuantity = cart[product._id] || 0; // Get the current quantity from the cart state
  
    // Send API request to add product to user's cart
    axiosInstance
      .post('/add-to-cart', { productId: product._id, quantity: currentQuantity })
      .then((response) => {
        setCart((prevCart) => ({
          ...prevCart,
          [product._id]: currentQuantity + 1, // Increase the cart quantity by 1
        }));
        toast.success('Product added to cart successfully');
        console.log('Product added to cart:', response.data);
      })
      .catch((error) => {
        toast.error('Error adding product to cart');
        console.error('Error adding product to cart:', error);
      });
  };
  
  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  return (
    <div>
                <Navbar handleCartOpen={handleCartOpen}/>
      <Container maxWidth="lg" style={{ marginTop: '20px', marginBottom: '80px' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Product Listing for {category}
        </Typography>
        <Grid container spacing={8}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <div
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '10px',
                  height: '100%',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Typography variant="body2" color="textSecondary">
                    In stock: {product.productQuantity}
                  </Typography>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    onClick={() => openProductDetails(product)} // Open modal on image click
                  />
                  <Typography variant="body1">{product.title}</Typography>
                  <Typography variant="subtitle1" color="primary">
                    ${product.productPrice}
                  </Typography>
                </div>
                <div style={{ marginTop: '5px' }}>
                  <TextField
                    type="number"
                    label="q"
                    value={cart[product._id] || 0}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      setCart((prevCart) => ({
                        ...prevCart,
                        [product._id]: newQuantity,
                      }));
                    }}
                    inputProps={{ min: 0, max: parseInt(product.productQuantity) }}
                    size="small"
                    style={{ width: '60px' }}
                  />
                </div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#4caf50', color: 'white' }}
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
        <ToastContainer position="bottom-right" />
      </Container>

      <Footer />

      {/* Product Details Modal */}
      <Modal open={modalOpen} onClose={closeProductDetails}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {selectedProduct && (
            <Card style={{ maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Product Details
                </Typography>
                <Typography variant="h6">{selectedProduct.title}</Typography>
                <Typography variant="body2" paragraph>
                  {selectedProduct.details}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {selectedProduct.productPrice}
                </Typography>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#4caf50', color: 'white', marginTop: '10px' }}
                  startIcon={<ShoppingCart />}
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    closeProductDetails();
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <Button color="secondary" onClick={closeProductDetails}>
                  Close
                </Button>
              </Box>
            </Card>
          )}
        </Box>
      </Modal>
      <SidebarCart open={cartOpen} onClose={handleCartClose} />
    
    </div>
  );
};

export default ProductListingPage;
