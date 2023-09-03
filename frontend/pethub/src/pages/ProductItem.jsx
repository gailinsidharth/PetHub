import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

const ProductItem = ({ product }) => {
  return (
    <motion.div className="product-item" whileHover={{ scale: 1.05 }}>
      <Card>
        <CardMedia component="img" src={product.image} alt={product.name} />
        <CardContent>
          <Typography variant="subtitle1">{product.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            ${product.price.toFixed(2)}
          </Typography>
          <IconButton color="primary">
            <AddShoppingCart />
          </IconButton>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductItem;
