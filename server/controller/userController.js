const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const createUser = async (req,res)=>{

  const { email, password , confirmPassword,username} = req.body;


    try {
        


         const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
      }

        if( password !== confirmPassword){
            return res.status(400).json({message:"Password dont match"})
        }

        const newUser = new User({email,password,username});
        await newUser.save();

        res.status(200).json({message:'User created successfully'})

    } catch (error) {
        
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req, res)=>{

    const { email,password,username} = req.body


    try {

      const user = await User.findOne({email})

      if(!user){
        return res.status(400).json({message:"Athentication failed. user not found"})
      }

      //compare password

      const isPasswordValid = await bcrypt.compare(password,user.password)
      if(!isPasswordValid){
        return res.status(400).json({message:"Authentication failed , Incorrect password/username."})
      }

     //create token 

     const token = jwt.sign({id:user._id},'gailin')
     
     if(!token){
        return res.status(500).json({message:"token creation failed.."})
     }

     //return the token

     res.status(200).json({id:user._id,email:user.email,username:user.username,token})

    } catch (error) {
        console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const userProfile = async (req,res)=>{

 try {
  const user = await User.findById(req.id).select('-password')
  res.json(user)
 } catch (error) {
  console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
 }

}

const viewUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching pet details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports ={ createUser, login,userProfile,viewUserById}