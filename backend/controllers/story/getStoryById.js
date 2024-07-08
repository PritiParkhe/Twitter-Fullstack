import { Story } from "../../models/storySchema.js";

const getStoryByIdController = async (req, res) => {
  try {
    const storyId = req.params.id;
    const story = await Story.findById(storyId)
      .populate("user_id", "-password") // Exclude password field
      .exec();

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      story,
      message: "Story retrieved successfully",
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

export { getStoryByIdController };
