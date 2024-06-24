import React from "react";
import bgImg from "../assets/bgImg.webp";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import avatar from "../assets/aboutImage.jpg";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useDispatch, useSelector } from "react-redux";
import AllApiUrls from "../utils/constants";
import { toast } from "react-toastify";
import { followingUpdate } from "../store/userSlice";
import { getRefresh } from '../store/tweetSlice';


const Profile = () => {
  const { id } = useParams();
  useGetUserProfile(id);
  const user = useSelector((state) => state.user.user);
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  if (!profile) {
    return <div>Loading...</div>;
  }

  const followAndUnfollowHandler = async () => {
    const isFollowing = user.following.includes(id);
    const url = isFollowing
      ? AllApiUrls.unfollow.Url(id)
      : AllApiUrls.follow.Url(id);
    const method = isFollowing
      ? AllApiUrls.unfollow.method
      : AllApiUrls.follow.method;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: user?._id }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(followingUpdate(id));
        dispatch(getRefresh())
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to update follow status");
      }
    } catch (error) {
      toast.error("Failed to follow user");
      console.log("Failed to follow user", error);
    }
  };

  return (
    <div className="w-[50%] border border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <Link
            to={"/"}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile.name}</h1>
            <p className="text-gray-500 text-sm">
              {profile.posts?.length || 0} posts
            </p>
          </div>
        </div>
        <div className="h-52">
          <img
            src={bgImg}
            alt="Profile Img"
            className="h-full w-full object-fill"
          />
        </div>
        <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
          <Avatar src={avatar} size="120" round={true} />
        </div>
        <div className="text-right m-4">
          {profile?._id === user?._id ? (
            <button className="px-4 py-1 rounded-full hover:bg-gray-200 border border-gray-400">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className={`px-4 py-1 rounded-full ${
                user.following.includes(id) ? "bg-gray-300" : "bg-black text-white"
              }`}
            >
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile.name}</h1>
          <p>{`@${profile.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
