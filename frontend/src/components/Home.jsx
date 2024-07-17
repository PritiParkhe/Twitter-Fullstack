import React, { useEffect } from "react";
import LeftsideBar from "./LeftsideBar";
import RightsideBar from "./RightsideBar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../hooks/useOthersUsers";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

const Home = () => {
  const user = useSelector((state) => state.user.user); // Ensure this points to the correct user state
  useOtherUsers(user?._id); // Ensure you have a valid user ID before calling
  useGetMyTweets(user?._id);
  const otherUsers = useSelector((state) => state.user.otherUsers); // Fetch other users from state
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col md:flex-row justify-between md:w-[70%] mx-auto mt-1">
      <LeftsideBar />
      <Outlet />
      <RightsideBar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
