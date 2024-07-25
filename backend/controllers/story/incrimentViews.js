import { Story } from "../../models/storySchema.js";

const incrementViewsController = async (req, res) => {
  try {
    const userId = req.userId; // Assuming user ID is available in req.userId
    const storyId = req.params.id;

    // Validate inputs
    if (!userId || !storyId) {
      return res.status(400).json({
        message: "User ID and Story ID are required",
        success: false,
        error: true,
      });
    }

    // Fetch the story
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        success: false,
        error: true,
      });
    }

    // Use MongoDB's $addToSet to ensure the userId is added only once
    const result = await Story.findByIdAndUpdate(
      storyId,
      { $addToSet: { views_count: userId } },
      { new: true } // Return the updated document
    );

    // Check if the view count was actually incremented
    if (result.views_count.length === story.views_count.length) {
      return res.status(400).json({
        message: "View count can only be incremented once per user",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      story: result,
      message: "Views count incremented successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { incrementViewsController };
