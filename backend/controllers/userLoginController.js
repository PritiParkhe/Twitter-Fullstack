import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.TOKEN_SECRET;

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
        error: true,
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(201).json({
        message: "User not Found",
        error: true,
        success: false,
      });
    }
    
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, secretKey, { expiresIn: 60 * 60 * 10 });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      return res.cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {userLoginController}
