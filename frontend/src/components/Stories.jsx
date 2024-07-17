// StoryList.js
import React, { useState } from 'react';
import StoryBubble from './StoryBubble';
import StoryModal from './StoryModal';
import AddStoryModal from './AddStoryModal';

const initialStories = [
  { id: '1', username: 'User 1', imgSrc: 'https://via.placeholder.com/150' },
  { id: '2', username: 'User 2', imgSrc: 'https://via.placeholder.com/150' },
  { id: '3', username: 'User 3', imgSrc: 'https://via.placeholder.com/150' },
  // Add more stories as needed
];

const currentUser = { id: 'current', username: 'You', imgSrc: 'https://via.placeholder.com/150', stories: [] };

const StoryList = ({openStoryModal, closeStoryModal, openAddStoryModal, closeAddStoryModal }) => {
  const [stories, setStories] = useState(initialStories);
  const [currentUserStories, setCurrentUserStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);

  const openStory = (story) => {
    setSelectedStory(story);
    openStoryModal()
  };

  const closeStory = () => {
    setSelectedStory(null);
    closeStoryModal(); 
  };

  const handleAddStory = () => {
    closeStory();
    setIsAddStoryModalOpen(true);
  };

  const handleStorySubmit = (newStory) => {
    const updatedUserStories = [...currentUserStories, newStory];
    setCurrentUserStories(updatedUserStories);
    setStories([{ ...currentUser, stories: updatedUserStories }, ...stories.filter(story => story.username !== 'You')]);
    setIsAddStoryModalOpen(false);
  };

  const handleCancelAddStory = () => {
    setIsAddStoryModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 border border-b-gray-300">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        <StoryBubble
          key={currentUser.id}
          imgSrc={currentUserStories[0]?.imgSrc || currentUser.imgSrc}
          username={currentUser.username}
          isCurrentUser={currentUserStories.length === 0}
          onAddStoryClick={handleAddStory}
          onClick={() => openStory({ ...currentUser, stories: currentUserStories })}
        />
        {stories.map((story) => (
          story.username !== 'You' && (
            <StoryBubble key={story.id} {...story} onClick={() => openStory(story)} />
          )
        ))}
      </div>
      {selectedStory && (
        <StoryModal
          isOpen={!!selectedStory}
          onClose={closeStory}
          stories={selectedStory.stories || [selectedStory]}
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
