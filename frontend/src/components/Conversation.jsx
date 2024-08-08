import React from "react";
import Avatar from "react-avatar";
import verified from "../assets/verified.png";

const Conversation = ({ conversation, onClick }) => {
  const user = conversation.participants[0]; // Assuming participants array contains user details

  return (
    <div
      className="flex gap-4 items-center p-1 cursor-pointer rounded-md"
      onClick={onClick}
    >
      <div className="relative">
        <Avatar size="50px" src={user.profilePic} round/>
        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border border-white rounded-full"></span>
      </div>
      <div className="flex flex-col text-sm gap-1">
        <div className="font-semibold flex items-center">
          {user.username}
          <img src={verified} alt="verified" className="w-4 h-4 ml-1" />
        </div>
        <p className="text-xs">{conversation.lastMessage.text}</p>
      </div>
    </div>
  );
};

export default Conversation;
