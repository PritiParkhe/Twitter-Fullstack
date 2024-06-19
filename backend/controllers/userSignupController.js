import { User } from "../models/userSchema.js";
import  bcryptjs from "bcryptjs"
const userSignupController = async(req,res) => {
  try {
    const {name, username, email, password} = req.body;
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message : "All fields are requied.",
        success: false,
        error : true
      })
    }
    const user = await User.findOne({email})
    if(user){
      return res.status(401).json({
        message : "User already exist.",
        success : false,
        error : true
      })
    }

    const hashedPassword = await bcryptjs.hash(password, 15);
    await User.create({
      name,
      username,
      email,
      password: hashedPassword
    });
    return res.status(201).json({
      message : "User created successfully.",
      success : true,
      error : false
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });   
    }
    
  }
  export{userSignupController}
