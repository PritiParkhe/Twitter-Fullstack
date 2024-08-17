import React from "react";
import AllApiUrls from "../utils/constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const currentUser = useSelector((state) => state.user.user);
  console.log(currentUser._id, "id");
  const navigate = useNavigate();

  const freezeAccount = async () => {
    if (!window.confirm("Are you want freeze Your account")) return;
    try {
      const response = await fetch(AllApiUrls.freezeAccount.Url, {
        method: AllApiUrls.freezeAccount.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      toast.success("Successfully freeze your account");
      if (toast.success) {
        navigate("/login");
      }
      if (data.error) {
        toast.error(data.error);
        console.log("error", data.error);
      }
      alert("Your account has been frozen.");
    } catch (error) {
      toast.error(error);
      console.log("Err", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Freeze Your Account
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        You can unfreeze your account by logging in.
      </p>
      <button
        className="px-6 py-3 bg-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-200"
        onClick={freezeAccount}
      >
        Freeze Account
      </button>
    </div>
  );
};

export default Settings;
