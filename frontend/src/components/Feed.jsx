import React from 'react'
import CreatePosts from './CreatePosts.jsx'
import Tweet from './Tweet.jsx'

const Feed = () => {
  return (
    <div className='w-[50%] border border-gray-200'>
      <div>
        <CreatePosts/>
        <Tweet/>
      </div>
    </div>
  )
}

export default Feed