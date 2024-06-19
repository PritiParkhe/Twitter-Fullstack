import { Tweet } from "../../models/tweetSchema.js";

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
    await Tweet.create({
      description,
      userId:id
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