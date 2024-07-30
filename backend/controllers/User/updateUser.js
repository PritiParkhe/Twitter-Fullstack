import { Tweet } from "../../models/tweetSchema.js";
import { User } from "../../models/userSchema.js";

const UpdateUserController = async(req,res) => {
  try {
    const { name, email, username, password, bio } = req.body;
    const { profilePic } = req.body;
    const { bgImg } = req.body;

    const userId = req.user.id;
    
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });

    }
    if(req.params.id !== userId.toString()){
      return res.status(400).json({
        message: "user profile canot be updated",
        error: true,
        success: false
      });

    }
    {/**for password Todo */}

    {/**profilepic */}

    user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;
		user.profilePic = profilePic || user.profilePic;
    user.bgImg = bgImg || user.bgImg;
		user.bio = bio || user.bio;

    user = await user.save();

    await Tweet.updateMany(
      
        {"comments.userId": userId},
        {
          $set: {
            "comments.$[comment].username": user.username,
            "comments.$[comment].userProfilePic": user.profilePic
          },
        },
        {arrayFilters: [{"comment.userId" : userId}]}
      
    )
    user.password = null;
    res.json({
      user,
      message: "Profile updated successfully",
      error: false,
      success: true

    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}
export{UpdateUserController}