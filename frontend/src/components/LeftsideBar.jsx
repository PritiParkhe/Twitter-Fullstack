import React from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";




const Leftsidebar = () => {
  return (
    <div className='w-[20%]'>
      <div>
        <div>
          <img className='ml-1' width={"50px"}src="https://1000logos.net/wp-content/uploads/2017/06/Twitter-Log%D0%BE.png" alt="twitter logo" />
        </div>
        <div className='my-4'>
          <div className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <MdHomeFilled size="24px"/>  
            </div>
            <h1 className='font-bold text-lg ml-2'>Home</h1>
          </div>
          <div className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <IoSearch size="24px"/>  
            </div>
            <h1 className='text-lg ml-2'>Explore</h1>
          </div>
          <div className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <IoNotificationsOutline size="24px"/>  
            </div>
            <h1 className='text-lg ml-2'>Notifications</h1>
          </div>
          <div className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <HiOutlineUser size="24px"/>  
            </div>
            <h1 className='text-lg ml-2'>Profile</h1>
          </div>
          <div className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <FaRegBookmark size="19px"/>  
            </div>
            <h1 className='text-lg ml-2'>Bookmarks</h1>
          </div>
          <div className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <IoLogOutOutline size="24px"/>  
            </div>
            <h1 className='font-bold text-lg ml-2'>Logout</h1>
          </div>
          <button className='bg-[#1D9BF0] px-4 py-2 border-none text-md w-full rounded-full text-white font-bold '>Post</button>
        </div>
        
      </div>
    </div>
  )
}

export default Leftsidebar