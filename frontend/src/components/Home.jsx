import React from 'react'
import LeftsideBar from './LeftsideBar'
import Feed from './Feed'
import RightsideBar from './RightsideBar'

const Home = () => {
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftsideBar/>
      <Feed/>
      <RightsideBar/>
    </div>
  )
}

export default Home