const jwt = require('jsonwebtoken');

const authenticateToken = (req,res,next)=>{


const token = req.headers.authorization;
if(!token){
    return res.status(400).json({Error:" Unauthorized..!!"})
}

const validToken = jwt.verify(token,'gailin')

req.id= validToken.id;

console.log(validToken)
next();

}


module.exports = authenticateToken;