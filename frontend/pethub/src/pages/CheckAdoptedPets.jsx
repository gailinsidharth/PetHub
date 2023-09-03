import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { axiosInstance } from '../utils/interceptors';

const CheckAdoptedPets = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);

  useEffect(() => {
    fetchAdoptedPets();
  }, []);

  const fetchAdoptedPets = async () => {
    try {
      const response = await axiosInstance.get('/getadoptedpets');
      setAdoptedPets(response.data);
    } catch (error) {
      console.error('Error fetching adopted pets:', error);
    }
  };

  const handleCancelAdoption = async (petId) => {
    try {
      await axiosInstance.post(`/canceladoption/${petId}`);
      setAdoptedPets((prevAdoptedPets) =>
        prevAdoptedPets.filter((pet) => pet.id !== petId)
      );
    } catch (error) {
      console.error('Error canceling adoption:', error);
    }
  };

  return (
    <div className="check-adopted-pets">
      <Typography variant="h4" gutterBottom>
        Check Adopted Pets
      </Typography>
      {adoptedPets.length > 0 ? (
        <Grid container spacing={2}>
          {adoptedPets.map((pet) => (
            <Grid item xs={12} md={4} key={pet.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="240"
                  image={pet.image}
                  alt={pet.name}
                />
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2">{pet.description}</Typography>
                  <Typography variant="body2">Price: ${pet.price}</Typography>
                  <Typography variant="body2">
                    Adopted By: {pet.adoptedBy.name} ({pet.adoptedBy.email} - {pet.adoptedBy.phone})
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancelAdoption(pet.id)}
                    fullWidth
                  >
                    Cancel Adoption
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No adopted pets found.</Typography>
      )}
    </div>
  );
};

export default CheckAdoptedPets;
