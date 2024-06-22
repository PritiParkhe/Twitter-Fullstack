import React from 'react'
import LeftsideBar from './LeftsideBar'
import RightsideBar from './RightsideBar'
import { Outlet } from 'react-router-dom'
import useOtherUsers from '../hooks/useOthersUsers'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((state) => state.user.user); // Ensure this points to the correct user state
  useOtherUsers(user?._id); // Ensure you have a valid user ID before calling

  const otherUsers = useSelector((state) => state.user.otherUsers); // Fetch other users from state

  return (
    <div className='flex justify-between w-[80%] mx-auto mt-1'>
      <LeftsideBar />
      <Outlet />
      <RightsideBar otherUsers={otherUsers}/>
    </div>
  )
}

export default Home;
