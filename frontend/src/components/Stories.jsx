import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStories, fetchMyStories } from "../actions/storyActions";
import StoryBubble from "./StoryBubble";
import StoryModal from "./StoryModal";
import AddStoryModal from "./AddStoryModal";

const StoryList = ({ openStoryModal, closeStoryModal }) => {
  const dispatch = useDispatch();
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const userStories = useSelector((state) => state.story.userStories || []);
  const allStories = useSelector((state) => state.story.stories || []);
  const user = useSelector((state) => state.user.user || {});

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchAllStories()); // Fetch stories from users the current user is following
      dispatch(fetchMyStories()); // Fetch the current user's stories
    }
  }, [dispatch, user]);

  const openStory = (story) => {
    setSelectedStory(story);
    openStoryModal();
  };

  const closeStory = () => {
    setSelectedStory(null);
    closeStoryModal();
  };

  const handleAddStory = () => {
    closeStory();
    setIsAddStoryModalOpen(true);
  };

  const handleStorySubmit = () => {
    dispatch(fetchMyStories()); // Refresh user's stories after adding a new one
    setIsAddStoryModalOpen(false);
  };

  const handleCancelAddStory = () => {
    setIsAddStoryModalOpen(false);
  };

  // Group stories by user
  const groupedStories = allStories.reduce((acc, story) => {
    const userId = story.user_id._id;
    if (!acc[userId]) {
      acc[userId] = {
        user_id: story.user_id,
        stories: []
      };
    }
    acc[userId].stories.push(story);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-4 border border-b-gray-300">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        <StoryBubble
          key={user._id}
          imgSrc={user.profilePic || "https://via.placeholder.com/150"}
          username={"You"}
          isCurrentUser={true}
          onClick={() => openStory({ user_id: user, stories: userStories })}
          onAddStoryClick={handleAddStory}
          hasStories={userStories.length > 0}
        />
        {Object.values(groupedStories).map((group) => (
          <StoryBubble
            key={group.user_id._id}
            imgSrc={user.profilePic || "https://via.placeholder.com/150"} // Display the first story's media as the 
            username={group.user_id.username}
            onClick={() => openStory(group)}
            isCurrentUser={false}
            hasStories={true}
          />
        ))}
      </div>
      {selectedStory && (
        <StoryModal
          isOpen={!!selectedStory}
          onClose={closeStory}
          stories={selectedStory.stories}
          onAddStoryClick={handleAddStory}
        />
      )}
      {isAddStoryModalOpen && (
        <AddStoryModal
          onSubmit={handleStorySubmit}
          onCancel={handleCancelAddStory}
        />
      )}
    </div>
  );
};

export default StoryList;
