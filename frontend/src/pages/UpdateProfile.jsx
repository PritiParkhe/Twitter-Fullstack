import React, { useState, useRef } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { toast } from "react-toastify";
import AllApiUrls from "../utils/constants";
import { useSelector } from "react-redux";

export default function UpdateProfilePage() {
  const currentUser = useSelector((state) => state.user.user);
  const fileRef = useRef(null);
  const bgFileRef = useRef(null); // For background image
  const [updating, setUpdating] = useState(false);

  const [inputs, setInputs] = useState({
    name: currentUser.name,
    username: currentUser.username,
    email: currentUser.email,
    bio: currentUser.bio,
    password: "",
    profilePic: currentUser.profilePic||"",
    bgImg: currentUser.bgImg||"",
    id: currentUser._id, // Ensure this is correctly passed
  });

  const { handleImageChange: handleProfilePicChange, imgUrl: profilePicUrl } = usePreviewImg();
  const { handleImageChange: handleBgImgChange, imgUrl: bgImgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;
    setUpdating(true);

    try {
      const res = await fetch(AllApiUrls.updateProfile.Url, {
        method: AllApiUrls.updateProfile.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...inputs, profilePic: profilePicUrl, bgImg: bgImgUrl }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.message || "Error updating profile");
        return;
      }

      toast.success("Profile updated successfully");
      setInputs(data.user);
      localStorage.setItem("user-threads", JSON.stringify(data.user));
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center lg:w-[45%]">
      <div className="flex items-center justify-center w-full">
        <div className="w-full bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">User Profile Edit</h2>

          <div className="flex flex-col sm:flex-row items-center mb-4">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full shadow-md object-cover"
                src={profilePicUrl || currentUser.profilePic}
                alt="User Avatar"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 w-full">
              <button
                type="button"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                onClick={() => fileRef.current.click()}
              >
                Change Avatar
              </button>
              <input type="file" hidden ref={fileRef} onChange={handleProfilePicChange} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center mb-4">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full shadow-md object-cover"
                src={bgImgUrl || currentUser.bgImg}
                alt="Background Image"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 w-full">
              <button
                type="button"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                onClick={() => bgFileRef.current.click()}
              >
                Change Background
              </button>
              <input type="file" hidden ref={bgFileRef} onChange={handleBgImgChange} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="John Doe"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="johndoe"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="email"
              placeholder="your-email@example.com"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bio</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="Your bio."
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              placeholder="password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
              disabled={updating}
            >
              {updating ? "Updating..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
