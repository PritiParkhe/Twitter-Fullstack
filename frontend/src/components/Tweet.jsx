import React, { useState } from "react";
import Avatar from "react-avatar";
import avatar from "../assets/aboutImage.jpg";
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import AllApiUrls from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../store/tweetSlice";
import { timeSince } from "../utils/timstampsHelper";

const Tweet = ({ tweet }) => {
  const [commentData, setCommentData] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleOpenCloseComment = () => {
    setOpenComment((prev) => !prev);
  };

  const likeOrDislikeHandler = async (id) => {
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

  const deleteTweetHandler = async (id) => {
    try {
      const response = await fetch(AllApiUrls.deleteTweet.Url(id), {
        method: AllApiUrls.deleteTweet.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: user?._id }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(getRefresh());
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete tweet");
      console.log("delete tweet error:", error);
    }
  };

  const commentHandler = async (tweetId) => {
    try {
      const response = await fetch(AllApiUrls.comment.Url(tweetId), {
        method: AllApiUrls.comment.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: user._id, description: comment }), // Include userId here
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(getRefresh());
        toast.success(data.message);
        setCommentData([
          ...commentData,
          { userId: user._id, description: comment },
        ]);
        setComment(""); // Clear the input field after adding the comment
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to comment");
      console.log("comment post error:", error);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      commentHandler(tweet._id);
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex p-4">
        <Avatar
          src={tweet?.userDetails[0]?.profilePic || avatar}
          size="40"
          round={true}
        />
        <div className="ml-3 w-full">
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{tweet?.userDetails[0]?.name}</h1>
            <p className="text-gray-500 text-sm ml-2">{`@${
              tweet?.userDetails[0]?.username
            } ${timeSince(tweet?.createdAt)}`}</p>
          </div>
          <p className="mt-2 text-gray-800">{tweet?.description}</p>
          <div className="flex justify-between items-center my-3 ">
            <div className="flex items-center gap-2">
              <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                <FaRegComment size="22px" onClick={handleOpenCloseComment} />
              </div>
              <p className="text-sm">{tweet?.comments?.length || 0}</p>
            </div>
            <div className="flex items-center gap-2">
              <div
                onClick={() => likeOrDislikeHandler(tweet?._id)}
                className="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <FaRegHeart size="22px" />
              </div>
              <p className="text-sm">{tweet?.like?.length || 0}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                <FaRegBookmark size="22px" />
              </div>
              <p className="text-sm">{tweet?.bookmarks?.length || 0}</p>
            </div>
            {user?._id === tweet?.userId && (
              <div className="flex items-center">
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="p-2 hover:bg-red-200 rounded-full cursor-pointer"
                >
                  <MdOutlineDeleteOutline size="24px" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {openComment && (
        <div className="bg-gray-50 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Avatar src={user?.profile_pic || avatar} size="40" round={true} />
            <div className="w-full flex gap-2">
              <input
                type="text"
                placeholder="Type your comment here..."
                className="bg-white border text-xs lg:text-sm border-gray-300 rounded-full px-4 py-2 w-full outline-none"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button
                className="bg-[#1d9bf0] text-white text-sm px-4 py-2 rounded-full"
                onClick={handleCommentSubmit}
              >
                Send
              </button>
            </div>
          </div>

          {/* List of comments */}
          <div className="mt-3">
            {commentData.map((comment, index) => (
              <div
                className="flex gap-4 items-start border-t border-gray-200 pt-2 mt-2"
                key={index}
              >
                <Avatar
                  src={comment.userId?.profilePic || avatar}
                  size="30"
                  round={true}
                />
                <div className="flex flex-col w-full">
                  <p className="font-semibold text-sm">
                    {comment.userId?.username}
                  </p>
                  <p className="text-sm py-1 px-2 bg-white  ">
                    {comment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tweet;
