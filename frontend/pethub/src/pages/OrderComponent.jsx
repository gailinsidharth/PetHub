import React, { useState } from 'react';
import { Table, Input, Space,  } from 'antd';
import { TextField, Box, Container} from '@mui/material';
import {  BiSearch } from 'react-icons/bi';

const { Column } = Table;

const OrderComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([
    {
      key: '1',
      orderId: 'O001',
      orderTime: '2023-08-01 12:30 PM',
      customerName: 'John Doe',
      method: 'Credit Card',
      amount: '$100.00',
    },
    // Add more sample data here
  ]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = data.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Pagination configuration
  const pagination = {
    pageSize: 5, // Number of items per page
    total: filteredData.length, // Total number of items in the filtered data array
    showSizeChanger: true, // Allow users to change the page size
    showQuickJumper: true, // Allow users to jump to a specific page
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`, // Display total items count
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

      <Table dataSource={filteredData} pagination={pagination}>
        <Column title="ORDER ID" dataIndex="orderId" key="orderId" />
        <Column title="ORDER TIME" dataIndex="orderTime" key="orderTime" />
        <Column title="CUSTOMER NAME" dataIndex="customerName" key="customerName" />
        <Column title="METHOD" dataIndex="method" key="method" />
        <Column title="AMOUNT" dataIndex="amount" key="amount" />
      </Table>
    </Container>
  );
};

export default OrderComponent;
 