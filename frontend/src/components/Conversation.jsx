import React from "react";
import Avatar from "react-avatar";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import verified from "../assets/verified.png";

const Conversation = () => {
  return (
    <div className={`flex gap-4 items-center p-1 cursor-pointer rounded-md `}>
      <div className="relative">
        <Avatar size="50px" src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"  />
        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border border-white rounded-full"></span>
      </div>
      <div className="flex flex-col text-sm gap-1">
        <div className="font-semibold flex items-center">
          username
          <img src={verified} alt="verified" className="w-4 h-4 ml-1" />
        </div>
        <p className="text-xs ">Hello some Messsage...</p>
        {/* <div className="flex items-center text-xs gap-1">
          <span className={true ? "text-blue-400" : ""}>
            <BsCheck2All size={16} />
          </span>
          <BsFillImageFill size={16} />
        </div> */}
      </div>
    </div>
  );
};

export default Conversation;
