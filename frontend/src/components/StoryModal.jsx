import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import {
  incrementView,
  likeStory,
  deleteStory
} from '../actions/storyActions.js';
import { getRefresh } from "../store/storySlice";

const StoryModal = ({ isOpen, onClose, stories, onAddStoryClick }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const user = useSelector((state) => state.user.user || {});
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && stories.length > 0) {
      const timer = setInterval(() => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
      }, 10000); // 10 seconds

      return () => clearInterval(timer);
    }
  }, [isOpen, stories.length]);

  useEffect(() => {
    if (isOpen && stories.length > 0) {
      handleViewIncrement();
    }
  }, [currentStoryIndex, isOpen]); // Run the effect when currentStoryIndex or isOpen changes

  if (!isOpen || stories.length === 0) return null;

  const currentStory = stories[currentStoryIndex];
  const currentStoryOwnerId =
    currentStory.user_id?._id || currentStory.user?._id;

  const handleNext = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const handleViewIncrement = () => {
    dispatch(incrementView(currentStory._id, user._id));
    dispatch(getRefresh());
  };

  const handleLike = () => {
    dispatch(likeStory(currentStory._id, user._id));
    dispatch(getRefresh());
  };

  const handleDelete = () => {
    dispatch(deleteStory(currentStory._id));
    dispatch(getRefresh());
  };

  return (
    <div className="inset-0 bg-opacity-50 flex items-center justify-center p-2">
      <div className="bg-white w-full max-w-md p-4 relative border border-gray-300 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold lg:text-lg">
            {currentStory.user_id?.username || "Your"}'s Story
          </h2>
          <button className="text-red-500 text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="relative h-72 lg:h-[400px] mb-4 overflow-hidden rounded-lg">
          <img
            src={currentStory.media_url}
            alt="Story Content"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/556x742"; // Fallback image if the URL is invalid
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white p-3 text-md rounded-full font-bold cursor-pointer"
            onClick={handleNext}
          >
            <MdOutlineNavigateNext size="20px" />
          </button>
          <div className="flex items-center">
            <div className="p-2 hover:bg-slate-200 rounded-full font-bold cursor-pointer" onClick={handleViewIncrement}>
              <IoEyeOutline size="22px" />
            </div>
            <p>{currentStory.views_count?.length || 0}</p>
          </div>
          <div className="flex items-center">
            <div className="p-2 hover:bg-slate-200 rounded-full cursor-pointer" onClick={handleLike}>
              <FaRegHeart size="19px" />
            </div>
            <p>{currentStory.likes?.length || 0}</p>
          </div>

          {currentStoryOwnerId === user._id && (
            <>
              <div className="flex items-center justify-center">
                <div className="p-2 hover:bg-slate-200 rounded-full cursor-pointer" onClick={handleDelete}>
                  <MdDeleteOutline size="19px" />
                </div>
                <button
                  className="bg-green-500 text-white p-3 text-md rounded-full cursor-pointer"
                  onClick={onAddStoryClick}
                >
                  <TiPlus size="18px" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
