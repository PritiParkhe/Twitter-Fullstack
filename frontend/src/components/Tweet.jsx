import React from "react";
import Avatar from "react-avatar";
import avatar from "../assets/aboutImage.jpg";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import AllApiUrls from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../store/tweetSlice";
import {timeSince} from "../utils/timstampsHelper"
const Tweet = ({ tweet }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const likeOrDislikeHandeler = async (id) => {
    try {
      const response = await fetch(AllApiUrls.likeOrDislike.Url(id), {
        method: AllApiUrls.likeOrDislike.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: user?._id }),
      });
      dispatch(getRefresh());
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to like post");
      console.log("like post error:", error);
    }
  };

  const deleteTweetHandler = async(id) => {
    try {
      const response = await fetch(AllApiUrls.deleteTweet.Url(id),{
        method: AllApiUrls.deleteTweet.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({id: user?._id})
      })
      const data = await response.json()
      if (response.ok) {
        dispatch(getRefresh());
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete tweet");
      console.log("delete tweet error:", error);
      
    }

  }
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar src={avatar} size="40" round={true} />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold ">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${tweet?.userDetails[0]?.username} ${timeSince(tweet?.createdAt)}`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-slate-200 rounded-full cursor-pointer">
                  <FaRegComment size="22px" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandeler(tweet?._id)}
                  className="p-2 hover:bg-slate-200 rounded-full cursor-pointer"
                >
                  <FaRegHeart size="22px" />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-slate-200 rounded-full cursor-pointer">
                  <FaRegBookmark size="22px" />
                </div>
                <p>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div className="flex items-center">
                  <div onClick={()=>deleteTweetHandler(tweet?._id)} className="p-2 hover:bg-red-200 rounded-full cursor-pointer">
                    <MdOutlineDeleteOutline size="24px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
