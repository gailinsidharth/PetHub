import React, { useState } from 'react';
import { Table, Space, Button, } from 'antd';
import { TextField, Box,Container ,Input } from '@mui/material';
import { BiBlock, BiSearch } from 'react-icons/bi';

const { Column } = Table;

const CustomerComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([
    {
      key: '1',
      id: 'C001',
      joiningDate: '2023-08-01',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
   
    {
      key: '2',
      id: 'C002',
      joiningDate: '2023-08-10',
      name: 'gailin',
      email: 'gailin@example.com',
      phone: '123-456-7890',
    },

    {
      key: '3',
      id: 'C003',
      joiningDate: '2023-08-11',
      name: 'anju',
      email: 'anju@example.com',
      phone: '123-456-7890',
    },

    {
      key: '4',
      id: 'C004',
      joiningDate: '2023-08-10',
      name: 'ahasana',
      email: 'ahasana@example.com',
      phone: '123-456-7890',
    },

    {
      key: '5',
      id: 'C005',
      joiningDate: '2023-08-16',
      name: 'sumi',
      email: 'sumi@example.com',
      phone: '123-456-7890',
    },

    {
      key: '6',
      id: 'C006',
      joiningDate: '2023-08-17',
      name: 'vishnu',
      email: 'vishnu@example.com',
      phone: '123-456-7890',
    },

    {
      key: '7',
      id: 'C007',
      joiningDate: '2023-08-19',
      name: 'vishnu priya',
      email: 'vishnupriya@example.com',
      phone: '123-456-7890',
    },
  ]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleBlockUser = (key) => {
    // Implement your logic to block the user here
    // For this example, let's just update the blocked property in the data
    const updatedData = data.map((record) =>
      record.key === key ? { ...record, blocked: true } : record
    );
    setData(updatedData);
  };

  const filteredData = data.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const pagination = {
    pageSize: 5,
    total: filteredData.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} display="flex" justifyContent="space-between">
        <TextField
          label="Search Customers"
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
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="JOINING DATE" dataIndex="joiningDate" key="joiningDate" />
        <Column title="NAME" dataIndex="name" key="name" />
        <Column title="EMAIL" dataIndex="email" key="email" />
        <Column title="PHONE" dataIndex="phone" key="phone" />
        <Column
          title="ACTIONS"
          key="actions"
          render={(_, record) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => handleBlockUser(record.key)}
                disabled={record.blocked} // Disable button if the user is already blocked
              >
                <BiBlock size={18} />
                Block User
              </Button>
            </Space>
          )}
        />
      </Table>
    </Container>
  );
};

export default CustomerComponent;