import React from "react";
import Avatar from "react-avatar";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import verified from "../assets/verified.png";

const Conversation = ({ conversation, onClick, isSelected, isOnline }) => {
  const user = conversation.participants?.[0];
  const currentUser = useSelector((state) => state.user.user);
  const lastMessage = conversation.lastMessage;
  if (
    !conversation ||
    !conversation.participants ||
    conversation.participants.length === 0
  ) {
    console.warn("Invalid conversation data:", conversation);
    conversation = {}; // Log invalid data
  }

  return (
    <div
      className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg transition border-b-2 ${
        isSelected ? "bg-gray-300" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar size="50px" src={user.profilePic} round />
        {isOnline ? (
          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border border-white rounded-full"></span>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col text-sm">
        <div className="flex items-center gap-1 font-semibold text-gray-800">
          {user.username}
          <img src={verified} alt="Verified" className="w-4 h-4" />
        </div>
        <p className="flex gap-1 text-xs text-gray-600">
          {currentUser._id === lastMessage?.sender && (
            <BsCheck2All
              size={16}
              className={`${
                lastMessage?.seen ? "text-blue-600" : "text-black"
              }`}
            />
          )}
          {lastMessage?.text?.length > 18
            ? `${lastMessage.text.substring(0, 18)}...`
            : lastMessage?.text || <BsFillImageFill size={15}/>}
            
        </p>
      </div>
    </div>
  );
};

export default Conversation;
