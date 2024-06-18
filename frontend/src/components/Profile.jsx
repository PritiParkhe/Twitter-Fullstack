import React from 'react'
import bgImg from '../assets/bgImg.webp'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar'
import avatar from "../assets/aboutImage.jpg" 


const Profile = () => {
  return (
    <div className='w-[50%] borader border-l border-r border-gray-200'>
      <div>
        <div className='flex items-center py-2'>
          <Link to={"/"} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoMdArrowBack size="24px"/>
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg'>Parkhe</h1>
            <p className='text-gray-500 text-sm'>10 posts</p>
          </div>
          
        </div>
        <div className=' h-52'>
          <img src={bgImg} alt='Profile Img' className='h-full w-full object-fill'/>
 

        </div>
        <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
            <Avatar src={avatar} size="120" round={true} />
        </div>
        <div className='text-right m-4 '>
          <button className='px-4 py-1 rounded-full hover:bg-gray-200 border border-gray-400 '>Edit Profile</button>
        </div>
        <div className='m-4'>
          <h1 className='font-bold text-xl'>Parkhe</h1>
          <p>@preetparkhe</p>
        </div>
        <div className='m-4 text-sm'>
          <p>💻 Software Engineer | 🤖 AI/ML Enthusiast | 🚀 Tech Innovator | 📊 Data Geek | 🔍 Always curious | 🌐 #TechForGood</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
