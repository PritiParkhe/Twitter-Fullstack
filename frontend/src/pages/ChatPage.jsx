import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import { toast } from "react-toastify";
import AllApiUrls from "../utils/constants";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.user.otherUsers);
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(AllApiUrls.getConversation.Url, {
          method: AllApiUrls.getConversation.method,
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch conversations");
        const data = await response.json();
        setConversations(data.conversations);
        toast.success("Fetched conversations");
      } catch (error) {
        toast.error(`Error fetching conversations: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  const handleConversationClick = async (conversation) => {
    console.log("Selected conversation:", conversation);

    const currentUserId = currentUser?._id;
    console.log("Current User ID:", currentUserId);
    console.log("Conversation Participants:", conversation.participants);

    // Find the other user's ID
    const otherUserObj = conversation.participants.find(
      (participant) => participant._id !== currentUserId
    );

    const otherUserId = otherUserObj ? otherUserObj._id : null;
    console.log("Other User ID:", otherUserId);

    if (!otherUserId) {
      toast.error("Other user ID is missing from the selected conversation.");
      setLoading(false);
      return;
    }

    // Find the other user in the `user` array
    const otherUser = user.find((user) => user._id === otherUserId);
    console.log("Found Other User:", otherUser);

    if (!otherUser) {
      toast.error("Other user not found in the user list.");
      setLoading(false);
      return;
    }

    setSelectedConversation(conversation);
    setLoading(true);

    try {
      const url = AllApiUrls.getMessage.Url(otherUser._id);
      console.log("Fetching messages from URL:", url);
      const response = await fetch(url, {
        method: AllApiUrls.getMessage.method,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(data.messages);
      toast.success("Messages loaded");
    } catch (error) {
      toast.error(`Error fetching messages: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[100%] md:w-[80%] lg:w-[750px] p-4">
        <div className="mx-auto flex gap-4 flex-col md:flex-row max-w-[400px] md:max-w-[100%]">
          <div className="mx-auto flex flex-col max-w-[250px] lg:max-w-[100%] w-screen-[30%] gap-2">
            <h1 className="font-bold text-gray-600">Your Conversations</h1>
            <form>
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
              {loading && <div>Loading conversations...</div>}
              {!loading && conversations.length === 0 && (
                <div>No conversations found</div>
              )}
              {!loading &&
                conversations.map((conversation) => (
                  <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    onClick={() => handleConversationClick(conversation)}
                  />
                ))}
            </div>
          </div>

          {!selectedConversation ? (
            <div className="flex flex-col items-center justify-center h-[400px] w-[100%] lg:w-[80%] border border-gray-300 rounded-md p-2">
              <GiConversation size={100} />
              <p className="text-md lg:text-xl">
                Select a conversation to start messaging
              </p>
            </div>
          ) : (
            <MessageContainer
              conversation={selectedConversation}
              messages={messages}
              loading={loading}
              setMessages={setMessages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
