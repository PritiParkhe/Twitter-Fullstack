import { Tweet } from "../../models/tweetSchema.js";

const likeOrDislikeTweetController = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;

    // Validate inputs
    if (!loggedInUserId || !tweetId) {
      return res.status(400).json({
        message: "User ID and Tweet ID are required",
        success: false,
        error: true,
      });
    }

    // Fetch the tweet
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
        error: true,
      });
    }

    // Determine if the user already liked the tweet
    const isLiked = tweet.like.includes(loggedInUserId);

    // Like or dislike the tweet
    if (isLiked) {
      await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });
      return res.status(200).json({
        message: "User disliked your tweet",
        success: true,
        error: false,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } });
      return res.status(200).json({
        message: "User liked your tweet",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { likeOrDislikeTweetController };
