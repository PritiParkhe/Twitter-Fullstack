import { User } from "../../models/userSchema.js";
import { Story } from "../../models/storySchema.js";

const getAllStoriesController = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId

    // Fetch the current user including their following list, excluding sensitive fields
    const currentUser = await User.findById(userId).select("-password");

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Include current user's ID in the list for their own stories
    const followingUserIds = [...currentUser.following, userId];

    // Retrieve stories from users the current user is following
    const stories = await Story.find({
      user_id: { $in: followingUserIds },
    })
      .populate({
        path: "user_id",
        select: "-password", // Ensure password exclusion in populated fields
      })
      .exec();

    res.status(200).json({
      stories,
      message: "Stories retrieved successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in getAllStoriesController:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export { getAllStoriesController };
