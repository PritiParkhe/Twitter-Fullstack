import React from 'react'
import CreatePosts from './CreatePosts.jsx'
import Tweet from './Tweet.jsx'
import { useSelector } from 'react-redux'
import StoryList from './Stories.jsx'

const Feed = () => {
  const tweets = useSelector((state)=>state.tweet.tweets)
  return (
    <div className='w-[50%] border border-gray-200'>
      <div>
        <StoryList/>
        <CreatePosts/>
        {
          tweets?.map((tweet)=>{
            return(
              <Tweet key={tweet?._id} tweet={tweet}/>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default Feed