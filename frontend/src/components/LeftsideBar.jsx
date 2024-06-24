import React from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AllApiUrls from '../utils/constants';
import { toast } from 'react-toastify';
import { getMyProfile, getOtherUsers, getUser } from '../store/userSlice';
import {getAllTweets} from '../store/tweetSlice'

const Leftsidebar = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const logoutHandler = async() =>{
    try {
      const response  = await fetch(AllApiUrls.logout.Url,{
        method: AllApiUrls.logout.method,
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message);
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getMyProfile(null));
        dispatch(getAllTweets(null));
        navigate('/login');
      }
    } catch (error) {
      toast.error(`Failed to logout`,error);
      console.log(`Failed to logout`,error);
      
    }

  }

  return (
    <div className='w-[20%]'>
      <div>
        <div>
          <img className='ml-1' width={"50px"}src="https://1000logos.net/wp-content/uploads/2017/06/Twitter-Log%D0%BE.png" alt="twitter logo" />
        </div>
        <div className='my-4'>
          <Link to={"/"} className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <MdHomeFilled size="24px"/>  
            </div>
            <h1 className='font-bold text-lg ml-2'>Home</h1>
          </Link>
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
          <Link to={`/profile/${user?._id}`} className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <HiOutlineUser size="24px"/>  
            </div>
            <h1 className='text-lg ml-2'>Profile</h1>
          </Link>
          <div className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
            <div >
              <FaRegBookmark size="19px"/>  
            </div>
            <h1 className='text-lg ml-2'>Bookmarks</h1>
          </div>
          <div onClick={logoutHandler} className='flex items-center my-2 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full'>
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