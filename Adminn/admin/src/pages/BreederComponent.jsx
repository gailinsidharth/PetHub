import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { TextField, Box, Container } from '@mui/material';
import { BiBlock, BiSearch, BiCheck } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../utils/interceptors';

const { Column } = Table;

const BreederComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBreeders();
  }, []);

  const fetchBreeders = async () => {
    try { 
      const response = await axiosInstance.get('/getbreeder');
      const breedersData = response.data.map((breeder, index) => ({
        key: index.toString(),
        id: breeder._id,
        joiningDate: breeder.joinedDate,
        name: breeder.firstname,
        email: breeder.email,
        phone: breeder.phone,
        approved: breeder.approved,
      }));
      setData(breedersData);
    } catch (error) {
      console.error('Error fetching breeders:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = data.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleApproveSeller = async (key) => {
    try {
      await axiosInstance.post(`/${key}/approve`);
      const updatedData = data.map((item) => {
        if (item.key === key) {
          return { ...item, approved: true };
        }
        return item;
      });
      setData(updatedData);
      toast.success('Breeder approved successfully!');
    } catch (error) {
      console.error('Error approving breeder:', error);
      toast.error('Error approving breeder. Please try again.');
    }
  };

  const handleBlockSeller = async (key) => {
    try {
      await axiosInstance.delete(`/${key}`);
      const updatedData = data.map((item) => {
        if (item.key === key) {
          return { ...item, approved: false };
        }
        return item;
      });
      setData(updatedData);
      toast.success('Breeder blocked successfully!');
    } catch (error) {
      console.error('Error blocking breeder:', error);
      toast.error('Error blocking breeder. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} display="flex" justifyContent="space-between">
        <TextField
          label="Search Sellers"
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
        <Column title="JOINING DATE" dataIndex="joiningDate" key="joiningDate" />
        <Column title="NAME" dataIndex="name" key="name" />
        <Column title="EMAIL" dataIndex="email" key="email" />
        <Column title="PHONE" dataIndex="phone" key="phone" />
        <Column
          title="ACTIONS"
          key="actions"
          render={(_, record) => (
            <Button.Group>
              {record.approved ? (
                <Button type="danger" onClick={() => handleBlockSeller(record.id)}>
                  <BiBlock size={18} />
                  Block breeder
                </Button>
              ) : (
                <Button type="primary" onClick={() => handleApproveSeller(record.id)}>
                  <BiCheck size={18} />
                  Approve breeder
                </Button>
              )}
            </Button.Group>
          )}
        />
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default BreederComponent;
