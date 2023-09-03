const Seller = require('../models/sellerModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')



const createSeller = async (req,res)=>{

    const {firstname,lastname,email,password,confirmPassword,bankName,accountNumber} = req.body

    try {

        const existingSeller = await Seller.findOne({email})

        if(existingSeller){
            return res.status(400).json({message:"Seller already exist...!"})
        }

        if(password !== confirmPassword){
            return res.status(400).json({message:"password does not match...!"})
        }

        const newSeller = new Seller({firstname,lastname,email,password,confirmPassword,bankName,accountNumber, joinedDate: new Date()})

        await newSeller.save()

        res.status(200).json({message:"Seller created successfully...!!"})
        
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }



}



const sellerLogin = async (req,res)=>{

    const {email,password} = req.body;

    try {

        const seller = await Seller.findOne({email})

        if(!seller){
            return res.status(400).json({message:"Authentication failed... seller not found !"})
        }

        //compare password

        const isPasswordValid = await bcrypt.compare(password,seller.password)
        if(!isPasswordValid){
            res.status(400).json({message:"Authentication failed , incorrect email/password..!"})
        }

        //create token

        const token = jwt.sign({id:seller._id},'gailin')

        if(!token){
            res.status(500).json({message:"token creation failed"})
        }

        //return the token

        res.status(200).json({id:seller._id,email:seller.email,token})

        
    } catch (error) {
        console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

}

const getSellerById = async (req, res) => {
   
    try{
      const seller = await Seller.findById(req.id).select('-password')
      res.json(seller)
    }
  catch (error) {
    console.error('Error fetching seller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };

  const getSellerDetails = async (req, res) => {
    const sellerId = req.params.sellerId;
  
    try {
      const seller = await Seller.findById(sellerId).select('-password');
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      res.json(seller);
    } catch (error) {
      console.error('Error fetching seller details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const getSeller = async (req, res) => {
    try {
      const sellers = await Seller.find();
      res.json(sellers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const approveSeller = async (req, res) => {
    try {
      const seller = await Seller.findById(req.params.id);
      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }
      seller.approved = true;
      await seller.save();
      res.json({ message: 'Seller approved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const blockSeller = async (req, res) => {
    try {
      const seller = await Seller.findById(req.params.id);
      if (!seller) {
        return res.status(404).json({ error: 'Seller not found' });
      }
      seller.approved = false;
      await seller.save();
      res.json({ message: 'Seller blocked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {createSeller,sellerLogin,getSellerById,getSellerDetails,getSeller,approveSeller,blockSeller}