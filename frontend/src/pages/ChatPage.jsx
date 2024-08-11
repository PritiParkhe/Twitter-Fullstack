import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Conversation from "../components/Conversation";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import { toast } from "react-toastify";
import AllApiUrls from "../utils/constants";
import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";

const ChatPage = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const user = useSelector((state) => state.user.otherUsers);
  const currentUser = useSelector((state) => state.user.user);

  const { socket, onlineUsers } = useSocket();

  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversation = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            };
          }
          return conversation;
        });
        return updatedConversation;
      });
    });
  }, [socket, setConversations]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(AllApiUrls.getConversation.Url, {
          method: AllApiUrls.getConversation.method,
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch conversations");
        const data = await response.json();
        setConversations(data.conversations || []);

        toast.success("Fetched conversations");
      } catch (error) {
        toast.error(`Error fetching conversations: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [setConversations]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);

    try {
      const response = await fetch(AllApiUrls.getUserProfile.Url(searchText));
      const searchResults = await response.json();
      console.log("Search user result:", searchResults);

      if (!searchResults.length || searchResults.error) {
        toast.error(searchResults.error || "No user found");
        return;
      }

      const searchUser = searchResults[0]; // Assume only one result for simplicity
      const messageYourself = searchUser._id === currentUser._id;
      console.log(searchUser, "user");
      console.log(searchUser._id, "user");

      if (messageYourself) {
        toast.error("You cannot message yourself");
        return;
      }

      // Corrected the check for existing conversation
      const conversationAlreadyExist = conversations.find((conversation) =>
        conversation.participants?.some(
          (participant) => participant._id === searchUser._id
        )
      );

      if (conversationAlreadyExist) {
        setSelectedConversation({
          _id: conversationAlreadyExist._id,
          userId: searchUser._id,
          username: searchUser.username,
          userProfilePic: searchUser.profilePic,
        });
        return;
      }

      console.log(searchUser._id, "user");

      // If no existing conversation, create a mock conversation
      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchUser._id,
            username: searchUser.username,
            profilePic: searchUser.profilePic,
          },
        ],
      };

      console.log(mockConversation.participants[0]._id, "serch user");

      setConversations((prevConvs) => [...prevConvs, mockConversation]);
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("Search cannot be empty");
    } finally {
      setSearchingUser(false);
    }
  };

  const handleConversationClick = async (conversation) => {
    if (!conversation?.participants || conversation.participants.length === 0) {
      toast.error("Invalid conversation data.");
      return;
    }

    const currentUserId = currentUser?._id;

    // Assuming participants array contains the user objects
    const otherUserObj = conversation.participants.find(
      (participant) => participant._id !== currentUserId
    );
    // console.log("participants", conversation.participants);
    // console.log("otherUserObj", otherUserObj);

    if (!otherUserObj || !otherUserObj._id) {
      toast.error("Other user not found or missing ID.");
      return;
    }

    const otherUserId = otherUserObj._id;
    // console.log("otherUserId", otherUserId);

    const otherUser = user.find((u) => u._id === otherUserId);

    if (!otherUser) {
      toast.error("Other user not found in the user list.");
      return;
    }
    setSelectedConversationId(conversation._id);
    setSelectedConversation(conversation);
    setLoading(true);

    try {
      const url = AllApiUrls.getMessage.Url(otherUser._id);
      // console.log(otherUser._id, "id");
      // console.log(otherUserId, "oid");

      const response = await fetch(url, {
        method: AllApiUrls.getMessage.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(data.messages);
      toast.success("Messages loaded");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen">
      <div className="lg:w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-full p-2 shadow-md">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search users"
              className="flex-grow outline-none text-gray-700 px-3 py-2 rounded-full focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={searchingUser}
              className="text-blue-500 p-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              <CiSearch size={24} />
            </button>
          </div>
        </form>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          conversations
            .filter((conversation) => conversation.participants)
            .map((conversation) => (
              <Conversation
                key={conversation._id}
                isOnline={onlineUsers.includes(
                  conversation.participants[0]._id
                )}
                conversation={conversation}
                onClick={() => handleConversationClick(conversation)}
                isSelected={conversation._id === selectedConversationId}
              />
            ))
        )}
      </div>
      <div className="lg:w-2/3 bg-white flex-grow flex flex-col">
        {selectedConversation ? (
          <MessageContainer
            conversation={selectedConversation}
            messages={messages}
            setMessages={setMessages}
            setConversations={setConversations}
            loading={loading}
            selectedConversationId={selectedConversationId}
          />
        ) : (
          <div className="flex flex-col items-center justify-center flex-grow">
            <GiConversation size={200} />
            <p className="text-gray-600">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
