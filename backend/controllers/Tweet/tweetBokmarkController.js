import { User } from "../../models/userSchema.js";

const bookmarkController = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;

    // Validate IDs
    if (!loggedInUserId || !tweetId) {
      return res.status(400).json({
        message: "User ID and Tweet ID are required.",
        success: false,
        error: true,
      });
    }

    const user = await User.findById(loggedInUserId);
    
    // Check if tweet is already bookmarked
    if (user.bookmarks.includes(tweetId)) {
      // Remove from bookmarks
      await User.findByIdAndUpdate(
        loggedInUserId,
        { $pull: { bookmarks: tweetId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Removed from bookmarks",
        success: true,
        error: false,
      });
    } else {
      // Save to bookmarks
      await User.findByIdAndUpdate(
        loggedInUserId,
        { $push: { bookmarks: tweetId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Saved to bookmarks",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

export { bookmarkController };
