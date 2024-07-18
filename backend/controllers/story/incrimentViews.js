import { Story } from "../../models/storySchema.js";

const incrementViewsController = async (req, res) => {
  try {
    const userId = req.userId;// Assuming you have user ID in req.body.id
    const storyId = req.params.id;

    // Validate inputs
    if (!userId || !storyId) {
      return res.status(400).json({
        message: "User ID and Story ID are required",
        success: false,
        error: true,
      });
    }

    // Fetch the story
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
        success: false,
        error: true,
      });
    }

    // Check if the user already incremented views for this story
    const hasIncremented = story.views_count.includes(userId);

    // If user has already viewed, return message
    if (hasIncremented) {
      return res.status(400).json({
        message: "View count can only be incremented once per user",
        success: false,
        error: true,
      });
    }

    // If user hasn't viewed, increment the view count
    story.views_count += 1;
    story.views_count.push(userId); // Store user's ID to track viewed state
    await story.save();

    res.status(200).json({
      story,
      message: "Views count incremented successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { incrementViewsController };

// import { Story } from "../../models/storySchema.js";

// {
//   /**todo user can increse count only once */
// }
// const incrementViewsController = async (req, res) => {
//   try {
//     const storyId = req.params.id;

//     const story = await Story.findById(storyId);
//     if (!story) {
//       return res.status(404).json({
//         message: "Story not found",
//         error: true,
//         success: false,
//       });
//     }

//     story.views_count += 1;
//     await story.save();
//     res.status(200).json({
//       story,
//       message: "Views count incremented successfully",
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };
// export { incrementViewsController };
