import { Tweet } from "../../models/tweetSchema.js";

const deleteTweetController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the id parameter
    if (!id) {
      return res.status(400).json({
        message: "Tweet ID is required",
        success: false,
        error: true
      });
    }

    // Attempt to find and delete the tweet
    const deletedTweet = await Tweet.findByIdAndDelete(id);

    // Check if the tweet was found and deleted
    if (!deletedTweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
        error: true
      });
    }

    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

export { deleteTweetController };
