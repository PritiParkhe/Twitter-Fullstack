import { User } from "../../models/userSchema.js"

const freezeAccount = async(req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(!user) {
      return res.status(400).json({
        message: "User not found",
      })
    }
    user.isFrozen = true;
		await user.save();
		res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });    
  }
}
export{freezeAccount}