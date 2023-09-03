import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { axiosInstance } from "../utils/interceptors";

const SellerDashboard = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/getseller`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching seller data:", error);
    }
  };

  const onAddClick = () => {
    navigate("/addpet");
  };

  const onCheckBooking = () => {
    navigate("/CheckAdoptedPets");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="seller-dashboard"
    >
      <Card
        sx={{
          backgroundColor: "#F7F9FC",
          boxShadow: 3,
          textAlign: "center",
          padding: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Welcome, {data.firstname}!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 3 }}>
            Seller since {new Date(data.joinedDate).toLocaleDateString()}
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={onAddClick}
            sx={{ marginRight: 2 }}
          >
            Add Pet for Adoption
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<FontAwesomeIcon icon={faListAlt} />}
            onClick={onCheckBooking}
          >
            Check Bookings
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SellerDashboard;
