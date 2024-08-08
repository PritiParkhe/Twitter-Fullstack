import React, { useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import AllApiUrls from "../utils/constants";
import verified from "../assets/verified.png";

const MessageContainer = ({ conversation, messages, loading, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const response = await fetch(AllApiUrls.sendMessage.Url, {
        method: AllApiUrls.sendMessage.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId: conversation.participants[0]._id,
          message: newMessage,
        }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      const data = await response.json();
      setMessages([...messages, data.newMessage]);
      setNewMessage("");
      toast.success("Message sent");
    } catch (error) {
      toast.error(`Error sending message: ${error.message}`);
    }
  };

  return (
    <div className="w-full lg:w-[70%] bg-gray-100 border rounded-md p-1">
      {conversation && (
        <div className="w-full h-12 flex items-center gap-2">
          <Avatar
            src={conversation.participants[0].profilePic}
            size="40px"
            round
          />
          <p className="flex items-center">
            {conversation.participants[0].username}
            {conversation.participants[0].verified && (
              <img src={verified} alt="Verified" className="h-4 w-4 ml-1" />
            )}
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 my-4 h-[400px] overflow-y-scroll">
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((message, i) => (
            <div
              key={i}
              className={`flex gap-2 items-center p-1 border-none rounded-md ${
                message.sender === conversation.participants[0]._id ? "" : "ml-auto"
              }`}
            >
              {message.sender === conversation.participants[0]._id && (
                <Avatar
                  src={conversation.participants[0].profilePic}
                  size="30px"
                  round
                />
              )}
              <p
                className={`max-w-[230px] lg:max-w-[350px] bg-blue-400 p-1 border rounded-md text-sm lg:text-md ${
                  message.sender !== conversation.participants[0]._id ? "ml-auto" : ""
                }`}
              >
                {message.text}
              </p>
              {message.sender !== conversation.participants[0]._id && (
                <Avatar
                  src={conversation.participants[0].profilePic}
                  size="30px"
                  round
                />
              )}
            </div>
          ))
        )}
      </div>
      {conversation && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="py-1 px-2 border border-gray-500 hover:border-blue-500 rounded-full flex-grow"
          />
          <button
            onClick={handleSendMessage}
            className="w-[40px] p-2 border border-gray-500 hover:border-blue-500 rounded-2xl"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
