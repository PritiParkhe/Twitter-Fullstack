import { Conversation } from "../../models/conversation.js";
import { Message } from "../../models/message.js";
import { getRecipientSocketId, io } from "../../socket/socket.js";
import { v2 as cloudinary } from "cloudinary";

const sendMessageController = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    let { img } = req.body; // Changed const to let
    const senderId = req.userId;

    // Find or create the conversation
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

    // Handle image upload if present
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url; // Now this works
    }

    // Create and save the new message
    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message,
      img: img || "",
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

    // Send notification to recipient if online
    const recipientSocketId = getRecipientSocketId(recipientId);
    console.log(recipientSocketId, "recipientSocketId");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("new message", newMessage); // Changed to newMessage
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
