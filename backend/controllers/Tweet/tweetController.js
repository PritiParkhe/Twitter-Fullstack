import { Tweet } from "../../models/tweetSchema.js";
import { User } from "../../models/userSchema.js";

const createTweetController = async(req,res) => {
  try {
    const { description, id } = req.body;
    if(!description || !id){
      return res.status(401).json({
        message : "fields are required.",
        success : false,
        error : true
      });
    }
    const user = await User.findById(id).select("-password")
    await Tweet.create({
      description,
      userId:id,
      userDetails: user
    })
    return res.status(201).json({
      message : "Tweet created succesfully",
      success: true,
      error: false
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export {createTweetController}