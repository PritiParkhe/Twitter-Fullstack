import { Tweet } from "../../models/tweetSchema";

const commentController= async(req,res )=>{
  try {
    const userId = req.user.id;
    const {text} = req.body;
    const tweetId = req.params.id
    const userProfilePic =  req.user.ProfilePic;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({
        message: "Text field is required",
        error: true,
        success: false
      })
    }

    const tweet = await Tweet.findById(tweetId);
    if(!tweet){
      return res.status(404).json({
        message: "Tweet not found",
        error: true,
        success: false
      })
    }
    const comment = { userId, text, userProfilePic, username};

    tweet.comments.push(comment);
    await tweet.save();

    res.status(200).json({
      comment,
      message: "comment posted successfully",
      success: true,
      error: false
    })
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}