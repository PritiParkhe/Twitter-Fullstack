import { User } from "../../models/userSchema.js";

const getMyProfileController = async(req,res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
      user,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });   
  }
}
export{getMyProfileController}