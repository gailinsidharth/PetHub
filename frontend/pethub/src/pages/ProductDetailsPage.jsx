import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../utils/interceptors';

const ProductDetailsPage = () => {
  const { petId } = useParams();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    setShowAddressForm(true);
    navigate('/addaddress');
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axiosInstance.get(`/viewpetById/${petId}`);
      setProduct(response.data);

      const sellerResponse = await axiosInstance.get(`/getsellerdetails/${response.data.sellerId}`);
      setSeller(sellerResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Add a loading state or spinner
  }

  const sellerd = {
    rating: 4.8,
    comments: [
      { id: 1, comment: 'Great seller!', rating: 5 },
      { id: 2, comment: 'Fast delivery!', rating: 4 },
      { id: 3, comment: 'Good product!', rating: 4.5 },
    ],
  };

  const handleAddToCart = (productId) => {
    axiosInstance
      .post('/add-to-cart', { productId })
      .then(() => {
        // Optional: Show a success message or update the cart in the state
        toast.success('Product added to cart successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        navigate('/addtocart');
      })
      .catch((error) => {
        console.error('Failed to add product to cart:', error);
      });
  };

  return (
    <Container>
      <motion.div className="productdetails">
        {/* Other components and elements */}
        <Button
          className="add-to-cart-button"
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </Button>
        <Button
          className="add-to-cart-button"
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          onClick={handleBuyNowClick}
        >
          Buy Now
        </Button>
        {/* Rest of the component */}
      </motion.div>
    </Container>
  );
};

export default ProductDetailsPage;
