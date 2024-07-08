import { Story } from "../../models/storySchema.js";

const deleteStoryController = async (req, res) => {
  try {
    const storyId = req.params.id;

    const deletedStory = await Story.findByIdAndDelete(storyId);
    if (!deletedStory) {
      return res.status(404).json({
        message: 'Story not found',
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: 'Story deleted successfully',
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
export{deleteStoryController}