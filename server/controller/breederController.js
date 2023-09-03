const Breeder = require('../models/Breeder')
const Breed = require('../models/Breed')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createBreeder = async (req,res)=>{

    const {firstname,lastname,email,password,confirmpassword,phone, imageUrl,location} = req.body

    try {

        const existingBreeder = await Breeder.findOne({email})

        if(existingBreeder){
            return res.status(400).json({message:"Breeder already exist...!"})
        }

        if(password !== confirmpassword){
            return res.status(400).json({message:"password does not match...!"})
        }

        const newBreeder = new Breeder({firstname,lastname,email,password,confirmpassword,phone, imageUrl,location, joinedDate: new Date()})

        await newBreeder.save()

        res.status(200).json({message:"Breeder created successfully...!!"})
        
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }



}

const BreederLogin = async (req,res)=>{

    const {email,password} = req.body;

    try {

        const breeder= await Breeder.findOne({email})

        if(!breeder){
            return res.status(400).json({message:"Authentication failed... breeder not found !"})
        }

        //compare password

        const isPasswordValid = await bcrypt.compare(password,breeder.password)
        if(!isPasswordValid){
            res.status(400).json({message:"Authentication failed , incorrect email/password..!"})
        }

        //create token

        const token = jwt.sign({id:breeder._id},'gailin')

        if(!token){
            res.status(500).json({message:"token creation failed"})
        }

        //return the token

        res.status(200).json({id:breeder._id,email:breeder.email,token})

        
    } catch (error) {
        console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

}


const getBreederById = async (req, res) => {
   
    try{
      const breeder = await Breeder.findById(req.id).select('-password')
      res.json(breeder)
    }
  catch (error) {
    console.error('Error fetching seller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };

  const getBreederDetails = async (req, res) => {
    try{
        const breeder = await Breeder.find()
        res.json(breeder)
      }
      catch{
      console.error(error);
          res.status(500).json({ message: 'Server Error' });
      }
  }

  const viewBreederById = async (req, res) => {
    try {
      const userId = req.params.id;
      const breeder = await Breeder.findById(userId);
  
      if (!breeder) {
        return res.status(404).json({ error: 'Pet not found' });
      }
  
      res.json(breeder);
    } catch (error) {
      console.error('Error fetching pet details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const getBreederWithBreeds = async (req, res) => {
    const userId = req.params.id; // Assuming you're passing the breeder ID as a parameter in the URL
  
    try {
      // Fetch the breeder with the provided ID
      const breeder = await Breeder.findById(userId);
  
      if (!breeder) {
        return res.status(404).json({ message: 'Breeder not found' });
      }
  
      // Fetch all breeds associated with the breeder
      const breeds = await Breed.find({ breeder: userId });
  
      // Return the breeder and their breeds in the response
      res.status(200).json({ breeder, breeds });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get breeder and breeds', error });
    }
  };

 const approveBreeder = async (req, res) => {
    const breederId = req.params.id;
  
    try {
      const breeder = await Breeder.findByIdAndUpdate(
        breederId,
        { approved: true },
        { new: true }
      );
  
      if (!breeder) {
        return res.status(404).json({ message: 'Breeder not found' });
      }
  
      return res.status(200).json({ message: 'Breeder approved successfully' });
    } catch (error) {
      console.error('Error approving breeder:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const blockBreeder = async (req, res) => {
    const breederId = req.params.id;
  
    try {
      const breeder = await Breeder.findByIdAndUpdate(
        breederId,
        { approved: false },
        { new: true }
      );
  
      if (!breeder) {
        return res.status(404).json({ message: 'Breeder not found' });
      }
  
      return res.status(200).json({ message: 'Breeder blocked successfully' });
    } catch (error) {
      console.error('Error blocking breeder:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {createBreeder,BreederLogin,getBreederById,getBreederDetails,viewBreederById,getBreederWithBreeds,approveBreeder,blockBreeder}