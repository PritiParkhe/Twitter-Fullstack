import { User } from "../../models/userSchema.js";

const unfollowController = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; // Use userId from isAuthenticated middleware
    const userId = req.params.id;

    // Fetch both users
    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);

    // Check if the logged-in user is following the target user
    const isFollowing = user.followers.includes(loggedInUserId);

    if (!isFollowing) {
      return res.status(400).json({
        message: `You do not follow ${user.name}`,
        error: true,
        success: false,
      });
    }

    // Update followers and following lists
    await user.updateOne({ $pull: { followers: loggedInUserId } });
    await loggedInUser.updateOne({ $pull: { following: userId } });

    return res.status(200).json({
      message: `${loggedInUser.name} has unfollowed ${user.name}`,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

export { unfollowController };
