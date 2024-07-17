import React, { useState } from 'react';
import Avatar from 'react-avatar';
import avatar from "../assets/aboutImage.jpg"; 
import { CiImageOn } from "react-icons/ci";
import AllApiUrls from '../utils/constants';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getIsActive, getRefresh } from '../store/tweetSlice';

const CreatePosts = () => {
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.user.user);
  const isActive = useSelector((state)=>state.tweet.isActive);
  const dispatch = useDispatch()

  const onChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const submitHandler = async () => {
    try {
      const response = await fetch(AllApiUrls.createPosts.Url, {
        method: AllApiUrls.createPosts.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          id: user?._id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(getRefresh())
        toast.success(data.message);
        setDescription(""); // Clear the input after a successful post
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to create post");
      console.log('create post error:', error);
    }
  };

  const forYouHandler = ()=>{
    dispatch(getIsActive(true))

  };
  const followingHandler = ()=>{
    dispatch(getIsActive(false));

  }


  
  return (
    <div className='w-full'>
      <div>
        <div className='flex items-center justify-evenly border-b border-gray-200'>
          <div onClick={forYouHandler} className={`${isActive? "border-b-4 border-blue-500":"border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className='cursor-pointerfont-semibold text-gray-600 text-md lg:text-lg'>For You</h1>
          </div>
          <div onClick={followingHandler} className={`${!isActive? "border-b-4 border-blue-500":"border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className={`cursor-pointerfont-semibold text-gray-600 text-md lg:text-lg`}>Following</h1>
          </div>
        </div>
        <div>
          <div className='flex items-center p-4'>
            <div>
              <Avatar src={avatar} size="40" round={true} />
            </div>
            <input 
              value={description} 
              onChange={onChangeHandler} 
              className='w-full outline-none border-none  text-lg lg:text-xl ml-2' 
              type="text" 
              placeholder='What is happening?!' 
            />
          </div>
          <div className='flex items-center justify-between p-4 border-b border-gray-300'>
            <div>
              <CiImageOn size={"24px"} />
            </div>
            <button 
              onClick={submitHandler} 
              className='bg-[#1D9BF0] px-5 py-1 text-md lg:text-lg text-white border-none rounded-full'
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
