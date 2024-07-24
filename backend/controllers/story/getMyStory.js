import { User } from "../../models/userSchema.js";
import { Story } from "../../models/storySchema.js";

const getMyStoriesController = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId

    // Fetch the current user to ensure they exist
    const currentUser = await User.findById(userId).select("-password");

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Retrieve stories created by the current user
    const stories = await Story.find({ user_id: userId })
      .populate({
        path: "user_id",
        select: "-password", // Ensure password exclusion in populated fields
      })
      .exec();

    res.status(200).json({
      stories,
      message: "User's stories retrieved successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in getUserStoriesController:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export { getMyStoriesController };
