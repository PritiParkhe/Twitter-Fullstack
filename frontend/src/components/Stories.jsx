import React, { useState } from 'react';
import StoryBubble from './StoryBubble';
import StoryModal from './StoryModel';

const stories = [
  { id: '1', username: 'User 1', imgSrc: 'https://via.placeholder.com/150' },
  { id: '1', username: 'User 1', imgSrc: 'https://via.placeholder.com/150' },
  { id: '1', username: 'User 1', imgSrc: 'https://via.placeholder.com/150' },
  { id: '1', username: 'User 1', imgSrc: 'https://via.placeholder.com/150' },
  // Add more stories as needed
];

const StoryList = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const openStory = (story) => {
    setSelectedStory(story);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 border border-b-gray-300">
      <div className="flex space-x-4 overflow-x-auto">
        {stories.map((story) => (
          <StoryBubble key={story.id} {...story} onClick={() => openStory(story)} />
        ))}
      </div>
      {selectedStory && (
        <StoryModal
          isOpen={!!selectedStory}
          onClose={closeStory}
          storyContent={selectedStory}
        />
      )}
    </div>
  );
};

export default StoryList;
