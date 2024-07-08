import { User } from "../../models/userSchema.js";
import { Story } from "../../models/storySchema.js";

const createStoryController = async (req, res) => {
  try {
    const userId = req.userId; // Use req.userId from isAuthenticated middleware

    // Check if user with userId exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        success: false,
      });
    }

    // Create new Story object
    const newStory = new Story({
      user_id: userId,
      media_url: req.file.path, // Assuming you're using multer or similar for file uploads
      expires_at: req.body.expires_at,
    });

    // Save the new Story
    const savedStory = await newStory.save();

    // Respond with success message and saved Story
    res.status(201).json({
      story: savedStory,
      message: 'Story created successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    // Handle any errors
    console.error('Error creating story:', error);
    res.status(500).json({
      message: error.message || 'Internal Server Error',
      error: true,
      success: false,
    });
  }
};
export{createStoryController}