import { Story } from '../models/storySchema.js';
import { User } from '../models/userSchema.js';

const createStoryController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { expires_at } = req.body;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        success: false,
      });
    }

    const newStory = new Story({
      user_id: userId,
      media_url: req.file.path,
      expires_at,
    });

    const savedStory = await newStory.save();
    res.status(201).json({
      story: savedStory,
      message: 'Story created successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getAllStoriesController = async (req, res) => {
  try {
    const stories = await Story.find().populate('user_id').exec();
    res.status(200).json({
      stories,
      message: 'Stories retrieved successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getStoryByIdController = async (req, res) => {
  try {
    const storyId = req.params.id;
    const story = await Story.findById(storyId).populate('user_id').exec();
    if (!story) {
      return res.status(404).json({
        message: 'Story not found',
        error: true,
        success: false,
      });
    }
    res.status(200).json({
      story,
      message: 'Story retrieved successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const updateStoryController = async (req, res) => {
  try {
    const storyId = req.params.id;
    const { media_url, expires_at } = req.body;

    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      { media_url, expires_at },
      { new: true, runValidators: true }
    );

    if (!updatedStory) {
      return res.status(404).json({
        message: 'Story not found',
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      story: updatedStory,
      message: 'Story updated successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const deleteStoryController = async (req, res) => {
  try {
    const storyId = req.params.id;

    const deletedStory = await Story.findByIdAndDelete(storyId);
    if (!deletedStory) {
      return res.status(404).json({
        message: 'Story not found',
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: 'Story deleted successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const incrementViewsController = async (req, res) => {
  try {
    const storyId = req.params.id;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        message: 'Story not found',
        error: true,
        success: false,
      });
    }

    story.views_count += 1;
    await story.save();
    res.status(200).json({
      story,
      message: 'Views count incremented successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const addLikeController = async (req, res) => {
  try {
    const storyId = req.params.id;
    const userId = req.user.id;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        message: 'Story not found',
        error: true,
        success: false,
      });
    }

    const alreadyLiked = story.likes.some(like => like.user_id.toString() === userId);
    if (alreadyLiked) {
      return res.status(400).json({
        message: 'User already liked this story',
        error: true,
        success: false,
      });
    }

    story.likes.push({ user_id: userId });
    await story.save();
    res.status(200).json({
      story,
      message: 'Story liked successfully',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  createStoryController,
  getAllStoriesController,
  getStoryByIdController,
  updateStoryController,
  deleteStoryController,
  incrementViewsController,
  addLikeController,
};
