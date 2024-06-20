import { User } from "../../models/userSchema.js";

const followController = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; 
    const userId = req.params.id;

    // Check if the user is trying to follow themselves
    if (loggedInUserId === userId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
        error: true,
        success: false,
      });
    }

    // Fetch both users
    const loggedInUser = await User.findById(loggedInUserId);
    const user = await User.findById(userId);

    // Check if both users exist
    if (!loggedInUser || !user) {
      console.log('One or both users not found');
      return res.status(404).json({
        message: "One or both users not found",
        error: true,
        success: false,
      });
    }

    // Check if the user is already followed
    if (user.followers.includes(loggedInUserId)) {
      console.log(`${loggedInUser.name} already follows ${user.name}`);
      return res.status(400).json({
        message: `User already followed ${user.name}`,
        error: true,
        success: false,
      });
    }

    // Update followers and following lists
    await user.updateOne({ $push: { followers: loggedInUserId } });
    await loggedInUser.updateOne({ $push: { following: userId } });

    return res.status(200).json({
      message: `${loggedInUser.name} just followed ${user.name}`,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error('Error in followController:', error);
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

export { followController };
