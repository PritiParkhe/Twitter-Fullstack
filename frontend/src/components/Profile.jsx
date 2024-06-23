import React from 'react';
import bgImg from '../assets/bgImg.webp';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import avatar from '../assets/aboutImage.jpg';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const {id} = useParams();
  useGetUserProfile(id);
  const profile = useSelector((state) => state.user.profile);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-[50%] border border-l border-r border-gray-200'>
      <div>
        <div className='flex items-center py-2'>
          <Link to={'/'} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoMdArrowBack size="24px" />
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg'>{profile.name}</h1>
            <p className='text-gray-500 text-sm'>{profile.posts?.length || 0} posts</p>
          </div>
        </div>
        <div className='h-52'>
          <img src={bgImg} alt='Profile Img' className='h-full w-full object-fill' />
        </div>
        <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
          <Avatar src={avatar} size="120" round={true} />
        </div>
        <div className='text-right m-4'>
          <button className='px-4 py-1 rounded-full hover:bg-gray-200 border border-gray-400'>Edit Profile</button>
        </div>
        <div className='m-4'>
          <h1 className='font-bold text-xl'>{profile.name}</h1>
          <p>{`@${profile.username}`}</p>
        </div>
        <div className='m-4 text-sm'>
          <p>{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
