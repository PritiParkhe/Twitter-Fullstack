import { Tweet } from "../../models/tweetSchema.js";
import { User } from "../../models/userSchema.js";

const getAllTweetControllers = async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch tweets of the logged-in user
    const loggedInUserTweets = await Tweet.find({ userId: id });

    // Fetch tweets of users that the logged-in user is following
    const loggedInUser = await User.findById(id);
    const followingUserIds = loggedInUser.following.map(userId => userId.toString());
    const followingUserTweet = await Tweet.find({ userId: { $in: followingUserIds } });

    // Combine tweets and sort by createdAt descending
    let allTweets = [...loggedInUserTweets, ...followingUserTweet];
    allTweets.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json({
      tweets: allTweets,
      success: true,
      error: false,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

export { getAllTweetControllers };
