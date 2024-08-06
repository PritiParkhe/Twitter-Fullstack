import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";

const ChatPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[100%] md:w-[80%] lg:w-{750px} p-4">
        <container className="mx-auto flex  gap-4 flex-col md:flex-row max-w-[400px] md:max-w-[100%] ">
          {/**Conversation */}
          <div className=" mx-auto flex  flex-col max-w-[250px] lg:max-w-[100%] w-screen-[30%] gap-2">
            <h1 className="font-bold text-gray-600 ">Your Conversations</h1>
            <form className="">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search for user"
                  className="py-1 px-2 border border-gray-500 hover:border-blue-500 rounded-full"
                />
                <button className="w-[40px] p-2 border border-gray-500 hover:border-blue-500 rounded-2xl">
                  <CiSearch />
                </button>
              </div>
            </form>
            <div className="border border-gray-200 rounded-md p-1 shadow-md">
              {false &&
                [0, 1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-center  p-1 rounded-md "
                  >
                    <container className="flex">
                      <div className="w-12 h-12 rounded-full border border-gray-500  cursor-pointer " />
                    </container>
                    <div className="w-full flex flex-col gap-3">
                      <div className="h-[10px] w-20 border border-gray-400 rounded-md"></div>
                      <div className="h-2 w-[90px] border border-gray-400 rounded-md"></div>
                    </div>
                  </div>
                ))}
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
            </div>
          </div>

          {/* <div className="flex flex-col items-center justify-center h-[400px] lg:w-[70%] border border-gray-300 rounded-md p-2">
            <GiConversation size={100} />
            <p className="text-md lg:text-xl ">
              Select a conversation to start messesging
            </p>
          </div> */}
         
            <MessageContainer />
         
        </container>
      </div>
    </div>
  );
};

export default ChatPage;
