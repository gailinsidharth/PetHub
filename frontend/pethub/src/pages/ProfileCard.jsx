import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Avatar, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
 
    const navigate = useNavigate()

    const onProfileClick = (data)=>{
        navigate(`/profilepage/${data._id}`)
      }
  return (
    <motion.div whileHover={{ scale: 1.02 }} style={{ margin: '10px' }}>
      <Card style={{ backgroundColor: '#e6f4ea' }}> {/* Green shade background */}
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt={profile.name} src={profile.imageUrl} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{profile.firstname} {profile.lastname}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {profile.location}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
        <Button   fullWidth style={{ backgroundColor: '#4caf50', color: 'white' }} onClick={()=>onProfileClick(profile)}>
            View Profile
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
