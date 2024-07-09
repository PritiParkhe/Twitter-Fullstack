import React from 'react';

const StoryBubble = ({ imgSrc, username, onClick }) => {
  return (
    <div className="flex-none" onClick={onClick}>
      <div className="w-16 h-16 rounded-full border-4 border-blue-500 overflow-hidden cursor-pointer">
        <img src={imgSrc} alt="User Story" className="w-full h-full object-cover" />
      </div>
      <p className="text-xs text-center mt-2">{username}</p>
    </div>
  );
};

export default StoryBubble;
