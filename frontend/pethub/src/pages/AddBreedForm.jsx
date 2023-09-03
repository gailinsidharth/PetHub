import React, { useContext, useState } from "react";
import { Container, Typography, TextField, Button, Grid, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { ImageContext } from "../context/ImageContext";
import { motion } from "framer-motion";
import { axiosInstance } from "../utils/interceptors";

const AddBreedForm = () => {
    const [breedData, setBreedData] = useState({
      breed: "",
      category: "",
      description: "",
      age: "",
      certification: "",
      pictures: [],
    });
  
    const navigate = useNavigate();
  
    const imageContext = useContext(ImageContext);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setBreedData({ ...breedData, [name]: value });
    };
  
    const handleFileDrop = async (acceptedFiles) => {
      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          const response = await imageContext.handleImageUpload(file);
          return response.data.secure_url;
        });
  
        const uploadedPictures = await Promise.all(uploadPromises);
        setBreedData((prevData) => ({ ...prevData, pictures: [...prevData.pictures, ...uploadedPictures] }));
      } catch (error) {
        console.error("An error occurred during picture upload:", error);
      }
    };
  
    const handleRemovePicture = (index) => {
      setBreedData((prevData) => ({
        ...prevData,
        pictures: prevData.pictures.filter((_, i) => i !== index),
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axiosInstance.post("/createbreed", breedData);
        setBreedData({
          breed: "",
          category: "",
          description: "",
          age: "",
          certification: "",
          pictures: [],
        });
      } catch (error) {
        console.error("Error submitting breed data:", error);
      }
    };
  
    const onGoBack = () => {
      navigate("/breederdashboard");
    };
  
    return (
        <div   style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #67B26F, #4ca2cd)',
          }}>
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10 }}>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
            <Typography variant="h4" gutterBottom>
              Add Breed
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Breed"
                    name="breed"
                    value={breedData.breed}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Category"
                    name="category"
                    value={breedData.category}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                {/* Add other input fields here */}
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={breedData.description}
                    onChange={handleInputChange}
                    multiline
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Age"
                    name="age"
                    value={breedData.age}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Certification"
                    name="certification"
                    value={breedData.certification}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: "center", width: "100%" }}>
                  <Typography variant="h6">Upload Pictures</Typography>
                  <Dropzone onDrop={handleFileDrop} accept="image/*" multiple>
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone" {...getRootProps()}>
                        <input {...getInputProps()} multiple />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    )}
                  </Dropzone>
                  {breedData.pictures.length > 0 && (
                    <div>
                      <h4>Uploaded Pictures:</h4>
                      <div className="uploaded-pictures">
                        {breedData.pictures.map((picture, index) => (
                          <div key={index} className="uploaded-picture-container">
                            <img
                              src={picture}
                              alt={`Breed ${index + 1}`}
                              className="uploaded-picture"
                            />
                            <button
                              type="button"
                              className="remove-picture-button"
                              onClick={() => handleRemovePicture(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" type="submit">
                  Add Breed
                </Button>
                <Button variant="outlined" color="primary" onClick={onGoBack}>
                  Cancel
                </Button>
              </Grid>
            </form>
          </Paper>
        </motion.div>
      </Container>
      </div>
    );
  };
  
  export default AddBreedForm;