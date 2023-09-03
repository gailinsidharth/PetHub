import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Link, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { axiosInstance } from '../utils/interceptors';
import Pagination from '@mui/material/Pagination';

const ViewRequests = () => {
  const [breedRequests, setBreedRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { breederId } = useParams();

  useEffect(() => {
    fetchBreedRequests(page);
  }, [page]);

  const fetchBreedRequests = async (pageNumber) => {
    try {
      const response = await axiosInstance.get(`/breed-requests/${breederId}`);
      // Mocking data for demonstration
      const itemsPerPage = 3;
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedRequests = response.data.slice(startIndex, endIndex);

      setBreedRequests(paginatedRequests);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching breed requests:', error);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await axiosInstance.delete(`/breed-requests/${requestId}`);
      // Remove the deleted request from the list
      setBreedRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error('Error deleting breed request:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #67B26F, #4ca2cd)',
      }}
    >
      <Container
        maxWidth="md"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
            <Typography variant="h4" gutterBottom>
              View Requests
            </Typography>
            <div className="requests-list">
              {breedRequests.map((request) => (
                <Paper
                  elevation={2}
                  key={request._id}
                  sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column' }}
                >
                  <Link to={`/user-message/${request.userId._id}`} className="username-link">
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {request.userId.username}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="textSecondary">
                    Sent on: {new Date(request.createdAt).toLocaleDateString()} -{' '}
                    {new Date(request.createdAt).toLocaleTimeString()}
                  </Typography>
                  {request.updatedAt && (
                    <Typography variant="body2" color="textSecondary">
                      Last updated on: {new Date(request.updatedAt).toLocaleDateString()}
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteRequest(request._id)}
                    sx={{ mt: 1 }}
                  >
                    Delete
                  </Button>
                </Paper>
              ))}
            </div>
          </Paper>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default ViewRequests;
