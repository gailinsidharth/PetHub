import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { TextField, Box, Container } from '@mui/material';
import { BiSearch, BiTrash } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../utils/interceptors';

const { Column } = Table;

const ProductTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProductKey, setSelectedProductKey] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/getproduct'); // Update the endpoint
      const productData = response.data.map((product, index) => ({
        key: product._id,
        id: product._id,
        title: product.title,
        category: product.category,
        subCategory: product.subCategory,
        price: product.productPrice,
        quantity: product.productQuantity,
      }));
      setData(productData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = async (key) => {
    try {
      await axiosInstance.delete(`/product/${key}`); // Update the endpoint
      setData((prevData) => prevData.filter((item) => item.key !== key));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product. Please try again.');
    }
    setDeleteModalVisible(false);
  };

  const filteredData = data.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleDeleteClick = (key) => {
    setSelectedProductKey(key);
    setDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const deleteModalFooter = [
    <Button key="cancel" onClick={handleCloseDeleteModal}>
      Cancel
    </Button>,
    <Button
      key="delete"
      type="primary"
      danger
      onClick={() => handleDelete(selectedProductKey)}
    >
      Delete
    </Button>,
  ];

  return (
    <Container maxWidth="md">
      <Box mt={4} display="flex" justifyContent="space-between">
        <TextField
          label="Search product"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: <BiSearch size={18} />,
          }}
        />
      </Box>

      <Table dataSource={filteredData}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="title" dataIndex="title" key="title" />
        <Column title="category" dataIndex="category" key="category" />
        <Column title="subCategory" dataIndex="subCategory" key="subCategory" />
        <Column title=" price" dataIndex="price" key="productPrice" />
        <Column title=" quantity" dataIndex="quantity" key=" quantity" />

        <Column
          title="ACTIONS"
          key="actions"
          render={(_, record) => (
            <Button
              type="danger"
              icon={<BiTrash />}
              onClick={() => handleDeleteClick(record.key)}
            >
              Delete
            </Button>
          )}
        />
      </Table>

      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onCancel={handleCloseDeleteModal}
        footer={deleteModalFooter}
      >
        Are you sure you want to delete this product?
      </Modal>

      <ToastContainer />
    </Container>
  );
};

export default ProductTable;