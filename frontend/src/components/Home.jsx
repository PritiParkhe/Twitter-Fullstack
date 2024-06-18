import React from 'react'
import LeftsideBar from './LeftsideBar'
import Feed from './Feed'
import RightsideBar from './RightsideBar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex justify-between w-[80%] mx-auto mt-1'>
      <LeftsideBar/>
      <Outlet/>
      <RightsideBar/>
    </div>
  )
}

export default Home