import { Story } from "../../models/storySchema.js";

const addLikeController = async (req, res) => {
  try {
    const storyId = req.params.id;
    const userId = req.body.userId;
    // Validate userId
    if (!userId) {
      return res.status(400).json({
        message: "User ID not provided",
        error: true,
        success: false,
      });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        error: true,
        success: false,
      });
    }

    // Check if the user already liked this story
    const alreadyLiked = story.likes.some(
      (like) => like.user_id && like.user_id.equals(userId)
    );
    if (alreadyLiked) {
      return res.status(400).json({
        message: "User already liked this story",
        error: true,
        success: false,
      });
    }

    // Add the like
    story.likes.push({ user_id: userId });
    await story.save();

    // Respond with success message and updated story
    res.status(200).json({
      story,
      message: "Story liked successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      message: error.message || error.toString(),
      error: true,
      success: false,
    });
  }
};

export { addLikeController };
