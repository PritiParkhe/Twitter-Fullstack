import { Story } from "../../models/storySchema.js";

const addLikeController = async (req, res) => {
  try {
    const storyId = req.params.id;
    const userId = req.userId;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        error: true,
        success: false,
      });
    }

    const alreadyLiked = story.likes.some(
      (like) => like.user_id.toString() === userId
    );
    if (alreadyLiked) {
      return res.status(400).json({
        message: "User already liked this story",
        error: true,
        success: false,
      });
    }

    story.likes.push({ user_id: userId });
    await story.save();
    res.status(200).json({
      story,
      message: "Story liked successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { addLikeController };
