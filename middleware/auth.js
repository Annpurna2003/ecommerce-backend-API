

// To protect routes using JWT token.
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
 //extracting the authorization header
export default (req,res,next)=>{
   
const authHeader=req.headers.authorization;
if(!authHeader){
    return res.status(401).json({success:false,message:'Missing authorized header'});
}
//isolating the token
const token=authHeader.split(' ')[1];
if(!token){
    return res.status(401).json({success:false,message:'Invalid authorization header'})
}
// Verification and Payload Extraction
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {id: payload.id,email: payload.email};

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}