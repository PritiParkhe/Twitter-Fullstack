import React, { useState } from 'react';
import CreatePosts from './CreatePosts.jsx';
import Tweet from './Tweet.jsx';
import { useSelector } from 'react-redux';
import StoryList from './Stories.jsx';

const Feed = () => {
  const tweets = useSelector((state) => state.tweet.tweets);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const openStoryModal = () => {
    setIsStoryModalOpen(true);
  };

  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
  };

  return (
    <div className='w-[100%] border border-gray-200 lg:w-[50%]'>
      <div>
        <StoryList openStoryModal={openStoryModal} closeStoryModal={closeStoryModal} />
        {!isStoryModalOpen && (
          <div className="h-[calc(100vh-160px)] lg:h-[calc(100vh-130px)] overflow-y-auto scrollbar-hide">
            <CreatePosts />
            {tweets?.map((tweet) => (
              <Tweet key={tweet?._id} tweet={tweet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
