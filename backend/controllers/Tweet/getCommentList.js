import { Tweet } from "../../models/tweetSchema.js";

const getCommentListController = async (req, res) => {
  try {
    const userId = req.userId;
    const tweetId = req.params._id; // Corrected to extract tweetId properly
    console.log(tweetId, "teeetId");

    // Validate the userId
    if (!userId) {
      return res.status(400).json({
        message: "Please Login",
        success: false,
        error: true,
      });
    }

    // Find the tweet by id and populate comments
    const tweetWithComments = await Tweet.findById(tweetId).populate({
      path: "comments.userId",
      select: "username profilePic", // Include profilePic here
    });

    // Check if the tweet with comments was found
    if (!tweetWithComments) {
      return res.status(404).json({
        message: "Comments not found",
        success: false,
        error: true,
      });
    }

    // Extract the comments from the tweet
    const commentList = tweetWithComments.comments;

    return res.status(200).json({
      message: "Comments fetched successfully",
      data: commentList,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server Error",
      error: true,
      success: false,
    });
  }
};

export { getCommentListController };
