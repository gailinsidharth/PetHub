import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus, faCommentAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/interceptors';


const BreederDashboard = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/getbreederbyid');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const navigate = useNavigate();
  
    const addBreed = () => {
      navigate('/addbreed');
    };
  
    const addPet = () => {
      navigate('/sellpet');
    };
  
    const viewRequest = (breederId) => {
      navigate(`/viewrequest/${breederId}`);
    };
  
    return (
        <div style={{  width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #67B26F, #4ca2cd)',}}>
        <Card className="breeder-dashboard">
      <CardContent>
        <div style={{backgroundColor: "#F7F9FC",
          boxShadow: 3,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          textAlign: "center",
          padding:'30px',}}>
          <div className="profile-picture">
            <Avatar alt="Profile" src={data.imageUrl} sx={{ width: 120, height: 120 }} />
          </div>
          <div className="breeder-info">
            <Typography variant="h6" className="breeder-name">{data.firstname} {data.lastname}</Typography>
            <Typography variant="body2" className="breeder-location">{data.location}</Typography>
            <Typography variant="body2" className="breeder-joined">Breeder since: {data.joinedDate}</Typography>
          </div>
        </div>
        <Grid container spacing={2} justifyContent="center" sx={{mt:6,ml:7}}>

            <Grid item xs={12} md={6} lg={4}>
              <div className="section">
                <div className="section-content">
                  <FontAwesomeIcon icon={faPlus} className="section-icon" />
                  <Typography variant="h6" className="section-title">Available Breeds for Breeding</Typography>
                  <Typography variant="body2" className="section-description">Add details about the available breed for breeding.</Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={addBreed}
                  className="action-button"
                 
                >
                  Add Breed
                </Button>
              </div>
            </Grid>
            
           
          
            <Grid item xs={12} md={6} lg={4}>
              <div className="section">
                <div className="section-content">
                  <FontAwesomeIcon icon={faEye} className="section-icon" />
                  <Typography variant="h6" className="section-title">View Breed Requests</Typography>
                  <Typography variant="body2" className="section-description">View and respond to breed requests from customers.</Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => viewRequest(data._id)}
                  className="action-button"
                 
                >
                  View Requests
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <div className="section">
                
                
              </div>
            </Grid>
            
           
          </Grid>
        </CardContent>
      </Card>
      </div>
    );
  };
  
  export default BreederDashboard;