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
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
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
        setConversations(data.conversations || []);

        toast.success("Fetched conversations");
      } catch (error) {
        toast.error(`Error fetching conversations: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

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

        if (messageYourself) {
            toast.error("You cannot message yourself");
            return;
        }

        // Corrected the check for existing conversation
        const conversationAlreadyExist = conversations.find(
            (conversation) => 
                conversation.participants?.some(
                    (participant) => participant._id === searchUser._id
                )
        );

        console.log("Conversation already exist:", conversationAlreadyExist);

        if (conversationAlreadyExist) {
            setSelectedConversation({
                _id: conversationAlreadyExist._id,
                userId: searchUser._id,
                username: searchUser.username,
                userProfilePic: searchUser.profilePic,
            });
            return;
        }

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
    console.log("participants", conversation.participants);
    console.log("otherUserObj", otherUserObj);

    if (!otherUserObj || !otherUserObj._id) {
      toast.error("Other user not found or missing ID.");
      return;
    }

    const otherUserId = otherUserObj._id;
    console.log("otherUserId", otherUserId);

    const otherUser = user.find((u) => u._id === otherUserId);

    if (!otherUser) {
      toast.error("Other user not found in the user list.");
      return;
    }

    setSelectedConversation(conversation);
    setLoading(true);

    try {
      const url = AllApiUrls.getMessage.Url(otherUser._id);
      console.log(otherUser._id ,"id");
      console.log(otherUserId, "oid");
      
      
      const response = await fetch(url, {
        method: AllApiUrls.getMessage.method,
        credentials: "include",
      });


      if (!response.ok) {

        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(data.messages || []);
      toast.success("Messages loaded");
    } catch (error) {
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search users"
        />
        <button type="submit" disabled={searchingUser}>
          <CiSearch />
        </button>
      </form>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          conversations.map((conversation) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              onClick={() => handleConversationClick(conversation)}
          isSelected={conversation._id === selectedConversationId}
            />
          ))
        )}
      </div>
      {selectedConversation && (
        <MessageContainer
          conversation={selectedConversation}
          messages={messages}
          setMessages={setMessages}
          setConversations={setConversations}
        />
      )}
    </div>
  );
};

export default ChatPage;
