import { User } from "../../models/userSchema.js";

const getOtherUserProfileController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        error: true,
        success: false,
      });
    }

    // Find users other than the provided ID
    const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");

    if (!otherUsers.length) {
      return res.status(404).json({
        message: "No other users found",
        success: false,
        error: true,
      });
    } else {
      return res.status(200).json({
        otherUsers,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

export { getOtherUserProfileController };

