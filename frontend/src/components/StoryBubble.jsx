// StoryBubble.js
import React from 'react';

const StoryBubble = ({ imgSrc, username, isCurrentUser, onClick, onAddStoryClick }) => {
  return (
    <div className="flex-none" onClick={isCurrentUser ? onAddStoryClick : onClick}>
      <div className="w-16 h-16 rounded-full border-4 border-blue-500 overflow-hidden cursor-pointer relative">
        {isCurrentUser && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
            <span className="text-2xl font-bold text-blue-500">+</span>
          </div>
        )}
        <img src={imgSrc} alt="User Story" className="w-full h-full object-cover" />
      </div>
      <p className="text-xs text-center mt-2">{username}</p>
    </div>
  );
};

export default StoryBubble;
