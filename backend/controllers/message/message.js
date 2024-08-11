import { Conversation } from "../../models/conversation.js";
import { Message } from "../../models/message.js";
import { getRecipientSocketId, io } from "../../socket/socket.js";

const sendMessageController = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.userId;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recipientId],
        lastMessage: {
          text: senderId,
          sender: senderId,
        },
      });
      await conversation.save();
    }

    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message,
    });

    await Promise.all([
      newMessage.save(),
      conversation.updateOne({
        lastMessage: {
          text: message,
          sender: senderId,
        },
      }),
    ]);

    const recipientSocketId = getRecipientSocketId(recipientId);
    console.log(recipientSocketId, "recipientSocketId");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("new message", message);
    } else {
      console.log("Recipient is offline, message saved for later delivery.");
    }

    res.status(201).json({
      newMessage,
      message: "Message sent successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Internal error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { sendMessageController };
