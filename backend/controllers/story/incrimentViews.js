import { Story } from "../../models/storySchema.js";

{
  /**todo user can increse count only once */
}
const incrementViewsController = async (req, res) => {
  try {
    const storyId = req.params.id;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        error: true,
        success: false,
      });
    }

    story.views_count += 1;
    await story.save();
    res.status(200).json({
      story,
      message: "Views count incremented successfully",
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
export { incrementViewsController };
