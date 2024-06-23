import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import avatar from "../assets/aboutImage.jpg";
import {Link} from 'react-router-dom'


const RightsideBar = ({ otherUsers }) => {

  return (
    <div className="w-[25%]">
      <div className="flex items-center p-2 bg-gray-100 outline-none rounded-full w-full">
        <CiSearch size={"20px"} />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold  text-lg">Who to follow</h1>
        {otherUsers?.map((user) => {
          return (
            <div key={user?._id} className="flex items-center justify-between my-3">
              <div className="flex">
                <div>
                  <Avatar src={avatar} size="40" round={true} />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user.username}`}</p>
                </div>
              </div>
              <Link to={`/profile/${user?._id}`}>
                <button className="px-4 py-1 mt-0 bg-black text-white rounded-full">
                  Profile
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightsideBar;
