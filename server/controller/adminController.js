const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const createAdmin = async (req,res)=>{

    const { name, email, password, confirmPassword } = req.body;

    try {

        const existingAdmin = await Admin.findOne({email})

        if(existingAdmin){
            return res.status(400).json({message:"Admin already exist...!"})
        }

        if(password !== confirmPassword){
            return res.status(400).json({message:"password does not match...!"})
        }

        const newAdmin = new Admin({name, email, password, confirmPassword, joinedDate: new Date()})

        await newAdmin.save()

        res.status(200).json({message:"Admin created successfully...!!"})
        
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }



}


const AdminLogin =  async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the admin by email
      const admin = await Admin.findOne({ email });
  
      // If admin not found, return an error
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Compare the entered password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, admin.password);
  
      // If passwords don't match, return an error
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create a JWT token and send it back as a response
      const token = jwt.sign({ id: admin._id }, 'gailin', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {createAdmin,AdminLogin}