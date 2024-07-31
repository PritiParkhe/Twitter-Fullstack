import { Tweet } from "../../models/tweetSchema.js";

const commentController = async (req, res) => {
  try {
    const userId = req.userId;
    const { description } = req.body;  // This should match the key in the request body
    const tweetId = req.params._id;

    if (!description) {
      return res.status(400).json({
        message: "Text field is required",
        error: true,
        success: false,
      });
    }

    const tweet = await Tweet.findById(tweetId).populate({
      path: "comments.userId",
      select: "username profilePic",
    });

    if (!tweet) {
      return res.status(404).json({
        message: `Tweet not found with ID ${tweetId}`,
        error: true,
        success: false,
      });
    }

    const comment = { userId, description };  // Ensure 'description' is used here

    tweet.comments.push(comment);  // Push the comment to the tweet's comments array
    await tweet.save();  // Save the updated tweet

    // Populate the user details for the comments
    const updatedTweet = await Tweet.findById(tweetId)
      .populate({
        path: "comments.userId",
        select: "username , profilePic",
      })
      .select("comments");

    res.status(200).json({
      comment,
      commentList: updatedTweet.comments,
      message: "Comment posted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { commentController };
