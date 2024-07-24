import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StoryModal = ({ isOpen, onClose, stories, onAddStoryClick }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const user = useSelector((state) => state.user.user || {});

  useEffect(() => {
    if (isOpen && stories.length > 0) {
      const timer = setInterval(() => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
      }, 10000); // 10 seconds

      return () => clearInterval(timer);
    }
  }, [isOpen, stories.length]);

  if (!isOpen || stories.length === 0) return null;

  const currentStory = stories[currentStoryIndex];
  const currentStoryOwnerId =
    currentStory.user_id?._id || currentStory.user?._id;

  console.log("Logged-in User ID:", user._id);
  console.log("Current Story Owner ID:", currentStoryOwnerId);

  const handleNext = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  return (
    <div className="inset-0 bg-opacity-50 flex items-center justify-center mt-2 p-1">
      <div className="bg-white w-full max-w-md p-4 relative border border-gray-300 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold lg:text-lg">
            {currentStory.user_id?.username || "Your"}'s Story
          </h2>
          <button className="text-red-500" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="relative w-full h-80 bg-gray-200 mb-4">
          <img
            src={currentStory.media_url}
            alt="Story Content"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150"; // Fallback image if the URL is invalid
            }}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleNext}
          >
            Next
          </button>
          {currentStoryOwnerId === user._id && (
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
