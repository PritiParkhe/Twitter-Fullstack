import React from 'react'
import LeftsideBar from './LeftsideBar'
import RightsideBar from './RightsideBar'
import { Outlet } from 'react-router-dom'
import useGetUserProfile from '../hooks/useGetUserProfile'

const Home = () => {
  //custom hook
  const id = 
  useGetUserProfile(id);
  return (
    <div className='flex justify-between w-[80%] mx-auto mt-1'>
      <LeftsideBar/>
      <Outlet/>
      <RightsideBar/>
    </div>
  )
}

export default Home