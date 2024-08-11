import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import AllApiUrls from "../utils/constants";
import verified from "../assets/verified.png";
import { useSocket } from "../context/SocketContext";
import { BsCheck2All } from "react-icons/bs";
import { useSelector } from "react-redux";
import { PiListChecks } from "react-icons/pi";

const MessageContainer = ({
  conversation,
  messages,
  loading,
  setMessages,
  setConversations,
  selectedConversationId,
}) => {
  const { socket } = useSocket();
  const [newMessage, setNewMessage] = useState("");
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      setConversations((prev) => {
        return prev.map((conv) => {
          if (conv._id === conversation._id) {
            return {
              ...conv,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return conv;
        });
      });
    };

    socket?.on("newMessage", handleNewMessage);

    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, conversation, setMessages, setConversations]);

  // Safeguard for user object
  const user = conversation?.participants?.[0] || {}; // Default to an empty object

  // Handle profile picture fallback
  const profilePic = user.profilePic || "https://via.placeholder.com/40"; // Fallback image

  const handleSendMessage = async () => {
    if (!conversation || !user?._id) {
      console.error(
        "Invalid conversation data for sending message:",
        conversation
      );
      toast.error("Invalid conversation data.");
      return;
    }
    const recipientId = user._id;

    try {
      const response = await fetch(AllApiUrls.sendMessage.Url, {
        method: AllApiUrls.sendMessage.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId,
          message: newMessage,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();

      // Check if the message has content before updating state

      setMessages((prevMessages) => [...prevMessages, data.newMessage]);

      setNewMessage("");
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(`Error sending message: ${error.message}`);
    }
  };

  useEffect(() => {
    const lastMessagefromOtherUser =
      messages.length &&
      messages[messages.length - 1].sender !== currentUser._id;
    if (lastMessagefromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: conversation._id,
        userId: selectedConversationId._id,
      });
    }
    socket.on("messagesSeen", ({ conversationId }) => {
      if (conversationId._id === conversationId) {
        setMessages((prev) => {
          const udateMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          return udateMessages;
        });
      }
    });
  }, [socket, conversation._id, messages, selectedConversationId]);
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md h-full flex flex-col">
      {conversation && user && (
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <Avatar src={profilePic} size="40px" round />
          <p className="flex items-center text-gray-800">
            {user.username}
            <img src={verified} alt="Verified" className="h-4 w-4 ml-1" />
          </p>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading messages...</p>
        ) : Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, i) => (
            // Ensure each message has a unique key
            <div
              key={i}
              className={`flex gap-2 items-center p-2 ${
                message.sender === user?._id ? "justify-start" : "justify-end"
              }`}
            >
              {message.sender === user?._id && (
                <Avatar src={profilePic} size="30px" round />
              )}

              <p
                className={`flex items-center gap-1 max-w-[230px] lg:max-w-[350px] p-2 rounded-md ${
                  message.sender === user?._id
                    ? "bg-gray-200 text-gray-800"
                    : "bg-green-600 text-white"
                }`}
              >
                {message.text}
                {message.sender !== user?._id ? (
                  message.seen ? (
                    <div className="text-blue-600">
                      <BsCheck2All size={16} />
                    </div>
                  ) : (
                    <BsCheck2All size={16} />
                  )
                ) : (
                  ""
                )}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 h-[500px]">
            No messages yet
          </div>
        )}
      </div>
      <div className="flex gap-2 p-4 border-t border-gray-200">
        <input
          type="text"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          className="w-1/2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageContainer;
