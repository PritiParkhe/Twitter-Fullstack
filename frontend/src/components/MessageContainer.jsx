import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import AllApiUrls from "../utils/constants";
import verified from "../assets/verified.png";
import { useSocket } from "../context/SocketContext";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import usePreviewImg from "../hooks/usePreviewImg";
import messageSound from "../assets/sound.mp3";


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
  const [isSending, setIsSending] = useState(false); // State to handle sending state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const imageRef = useRef(null); // Reference for the image input
  const currentUser = useSelector((state) => state.user.user);

  // Use the custom hook
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === conversation._id
            ? {
                ...conv,
                lastMessage: {
                  text: message.text,
                  sender: message.sender,
                },
              }
            : conv
        )
      );
    };

    socket?.on("newMessage", handleNewMessage);
    
    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, conversation, setMessages, setConversations]);

  const user = conversation?.participants?.[0] || {};
  const profilePic = user.profilePic || "https://via.placeholder.com/40";

  const handleSendMessage = async () => {
    if (!newMessage && !imgUrl) return;
    if (isSending) return;
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
      setIsSending(true); // Show spinner
      const response = await fetch(AllApiUrls.sendMessage.Url, {
        method: AllApiUrls.sendMessage.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId,
          message: newMessage,
          img: imgUrl, // Send the message or image URL
        }),
      });
      const sound = new Audio(messageSound);
      sound.play();
      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      setNewMessage("");
      setImgUrl(""); // Reset image URL after sending
      toast.success("Message sent");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(`Error sending message: ${error.message}`);
    } finally {
      setIsSending(false); // Hide spinner
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImgUrl("");
  };

  useEffect(() => {
    const lastMessageFromOtherUser =
      messages.length &&
      messages[messages.length - 1].sender !== currentUser._id;
    if (lastMessageFromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: conversation._id,
        userId: selectedConversationId._id,
      });
    }

    socket.on("messagesSeen", ({ conversationId }) => {
      if (conversationId._id === conversationId) {
        setMessages((prev) =>
          prev.map((message) =>
            !message.seen ? { ...message, seen: true } : message
          )
        );
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
            <div
              key={i}
              className={`relative flex gap-2 items-center p-2 ${
                message.sender === user?._id ? "justify-start" : "justify-end"
              }`}
            >
              <Avatar src={profilePic} size="30px" round />
              {message.text && (
                <p
                  className={`flex items-center gap-1 max-w-[230px] lg:max-w-[350px] p-2 rounded-md ${
                    message.sender === user?._id
                      ? "bg-gray-200 text-gray-800"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {message.text}
                  {message.sender !== user?._id && (
                    <div className="ml-1">
                      {message.seen ? (
                        <div className="text-blue-500">
                          <BsCheck2All size={16} />
                        </div>
                      ) : (
                        <div className="text-gray-700">
                          <BsCheck2All size={16} />
                        </div>
                      )}
                    </div>
                  )}
                </p>
              )}
              {message.img && (
                <div className="relative">
                  <img
                    src={message.img}
                    alt="Message img"
                    className={`cursor-pointer max-w-[230px] lg:max-w-[350px] p-4 rounded-md ${
                      message.sender === user?._id
                        ? "bg-gray-200 text-gray-800"
                        : "bg-green-600 text-white"
                    }`}
                    onClick={() => {
                      setImgUrl(message.img);
                      setIsModalOpen(true);
                    }}
                  />
                  {message.sender !== user?._id && (
                    <div className="absolute bottom-1 right-2 text-gray-700">
                      {message.seen ? (
                        <BsCheck2All size={16} className="text-blue-600" />
                      ) : (
                        <BsCheck2All size={16} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 h-[500px]">
            No messages yet
          </div>
        )}
      </div>
      <div className="flex gap-2 p-4 border-t border-gray-200 mx-3">
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
          className="w-1/8 lg:w-1/5 text-white p-1 rounded-md hover:bg-blue-600 transition justify-center items-center"
          onClick={handleSendMessage}
        >
          {isSending ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className=" flex items-center justify-center">
              <IoSendSharp size={24} className="text-blue-500 " />
            </div>
          )}
        </button>
        <div className="flex items-center gap-1">
          <BsFillImageFill
            size={20}
            onClick={() => imageRef.current.click()}
            className="cursor-pointer"
          />
          <input
            type="file"
            hidden
            ref={imageRef}
            onChange={(e) => {
              handleImageChange(e);
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              Close
            </button>
            <div className="mt-4">
              <img
                src={imgUrl}
                alt="Selected"
                className="max-w-full max-h-[70vh] object-cover"
              />
            </div>
            <div className="flex justify-end mt-4">
              <IoSendSharp
                size={24}
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  handleSendMessage();
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
