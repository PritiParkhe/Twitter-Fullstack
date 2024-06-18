import React from 'react'
import Avatar from 'react-avatar'
import avatar from "../assets/aboutImage.jpg" 
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
const Tweet = () => {
  return (
    <div className='border-b border-gray-200'>
      <div>
        <div className='flex p-4'>
          <Avatar src={avatar} size="40" round={true} />
          <div className='ml-2 w-full'>
            <div className='flex items-center'>
              <h1 className='font-bold '>Priti</h1>
              <p className='text-gray-500 text-sm ml-1'>@preetparkhe . 1m</p>
            </div>
            <div>
              <p>Hello Developer lets connect and grow together</p>
            </div>
            <div className='flex justify-between my-3'>
            <div className='flex items-center'>
                <div  className='p-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                  <FaRegComment size="20px"/> 
                </div>
                <p>0</p>
              </div>
              <div className='flex items-center'>
                <div className='p-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                  <CiHeart size="24px"/>
                </div>
                <p>0</p>
              </div>
              <div className='flex items-center'>
                <div className='p-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                  <CiBookmark size="24px"/>
                </div>
                <p>0</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Tweet