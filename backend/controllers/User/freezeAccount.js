import { User } from "../../models/userSchema.js"

const freezeAccount = async(req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(!user) {
      return res.status(400).json({
        message: "User not found",
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });    
  }
}
export{freezeAccount}