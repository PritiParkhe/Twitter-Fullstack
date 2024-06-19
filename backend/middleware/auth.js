import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET;

async function isAuthenticated(req, res, next){
  try {
    const token = req.cookies?.token 
    if(!token){
      return res.status(200).json({
        message : "User not Login",
        error : true,
        success : false,
      })
    }
    jwt.verify(token, secretKey, function(error, decoded) {
      console.log(error);
      console.log( "decode",decoded) // bar
      if(error){
        console.log("error auth",error);
      }
      req.userId = decoded?._id
      next()
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error : true,
      success : false,

    })
  }
}
export default isAuthenticated