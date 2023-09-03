import React from 'react';
import { motion } from 'framer-motion';
import { FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';

const ProductFilters = () => {
  // Sample data for categories
  const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Toys', 'Books'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{marginTop:'20px',maxWidth:'lg'}}
    >
        <Paper sx={{ p: 2 }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <TextField label="Search Products" variant="outlined" fullWidth margin="normal" />

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select label="Category">
            <MenuItem value="">All</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Dropdown */}
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Sort by Price</InputLabel>
          <Select label="Sort by Price">
            <MenuItem value="low-to-high">Low to High</MenuItem>
            <MenuItem value="high-to-low">High to Low</MenuItem>
          </Select>
        </FormControl>

        {/* Other Sorting Options (Date, Status, etc.) */}
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Sort by</InputLabel>
          <Select label="Sort by">
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>
      </div>
      </Paper>
    </motion.div>
  );
};

export default ProductFilters;
