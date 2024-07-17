// StoryModal.js
import React, { useEffect, useState } from 'react';

const StoryModal = ({ isOpen, onClose, stories, onAddStoryClick }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
      }, 15000); // 15 seconds

      return () => clearInterval(timer);
    }
  }, [isOpen, stories.length]);

  if (!isOpen) return null;

  const currentStory = stories[currentStoryIndex];

  const handleNext = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  return (
    <div className=" inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center mt-4 ">
      <div className="bg-white w-full max-w-md p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{currentStory.username}'s Story</h2>
          <button className="text-red-500" onClick={onClose}>Close</button>
        </div>
        <div className="h-lg bg-gray-200">
          <img src={currentStory.imgSrc} alt="Story Content" className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleNext}
          >
            Next
          </button>
          {currentStory.username === 'You' && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={onAddStoryClick}
            >
              Add New Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryModal;




















































// import React from 'react';

// const StoryModal = ({ isOpen, onClose, storyContent }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center mt-4">
//       <div className="bg-white w-full max-w-md p-4 rounded-lg mt-2 mb-2">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">{storyContent.username}'s Story</h2>
//           <button className="text-red-500" onClick={onClose}>Close</button>
//         </div>
//         <div className="h-lg bg-gray-200">
//           <img src={storyContent.imgSrc} alt="Story Content" className="w-full h-full object-cover" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryModal;