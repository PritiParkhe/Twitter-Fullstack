import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({
  path : "../.env"
} 
);

const secretKey = process.env.TOKEN_SECRET;

async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "User not logged in",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, secretKey, function (error, decoded) {
      if (error) {
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?._id;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

export default isAuthenticated;
