import React from "react";
import Avatar from "react-avatar";
import verified from "../assets/verified.png";

const MessageContainer = () => {
  const messages = [...Array(5)];

  return (
    <div className="w-[70%] bg-gray-100 border rounded-md p-1">
      {/** Message Header */}
      <div className="w-full h-12 flex items-center gap-2">
        <Avatar src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" size="40px" round />
        <p className="flex items-center">Preet
          <img src={verified} alt="Verified" className="h-4 w-4 ml-1" />
        </p>
      </div>
      <div className="flex flex-col gap-2 my-4 h-[400px] overflow-y-scroll">
        {messages.map((_, i) => (
          <div key={i} className="flex gap-2 items-center p-1 border-none rounded-md">
            <p className="max-w-[350px] bg-blue-400 p-1 border rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. amet consectetur adipisicing elit.
            </p>
          </div>
        ))}
        {messages.map((_, i) => (
          <div key={i} className="flex gap-2 items-center p-1 border-none rounded-md ml-auto">
            <p className="max-w-[350px] bg-blue-400 p-1 border rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. amet consectetur adipisicing elit.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageContainer;
