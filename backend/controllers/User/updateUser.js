import { Tweet } from "../../models/tweetSchema.js";
import { User } from "../../models/userSchema.js";

const UpdateUserController = async (req, res) => {
  try {
    const { name, email, username, password, bio, profilePic, bgImg } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // if (req.params.id !== userId.toString()) {
    //   return res.status(400).json({
    //     message: "User profile cannot be updated",
    //     error: true,
    //     success: false,
    //   });
    // }

    // Update fields only if new values are provided
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bgImg = bgImg || user.bgImg;
    user.bio = bio || user.bio;

    // Handle password update separately if provided
    if (password) {
      user.password = password; // Add appropriate hashing and validation
    }

    const updatedUser = await user.save();

    // Update comments in Tweets related to this user
    await Tweet.updateMany(
      { "comments.userId": userId },
      {
        $set: {
          "comments.$[comment].username": updatedUser.username,
          "comments.$[comment].userProfilePic": updatedUser.profilePic,
        },
      },
      { arrayFilters: [{ "comment.userId": userId }] }
    );

    updatedUser.password = null; // Remove password before sending response
    res.json({
      user: updatedUser,
      message: "Profile updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { UpdateUserController };
