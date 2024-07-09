import React from 'react';

const StoryModal = ({ isOpen, onClose, storyContent }) => {
  if (!isOpen) return null;

  return (
    <div className="inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center mt-4">
      <div className="bg-white w-full max-w-md p-4 rounded-lg mt-2 mb-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{storyContent.username}'s Story</h2>
          <button className="text-red-500" onClick={onClose}>Close</button>
        </div>
        <div className="h-lg bg-gray-200">
          <img src={storyContent.imgSrc} alt="Story Content" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
