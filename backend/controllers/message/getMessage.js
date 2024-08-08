import { Conversation } from "../../models/conversation.js";
import { Message } from "../../models/message.js";

const getMessageController = async (req, res) => {
  const { otherUserId } = req.params;
  const userId = req.userId;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] },
    });

    if (!conversation) {
      return res.status(404).json({
        messages: "Message not found",
      });
    }
    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    res.status(201).json({
      messages,
      message: "ok",
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
export { getMessageController };
