import React, { useState } from "react";
import AllApiUrls from "../utils/constants";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddStoryModal = ({ onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector((state) => state.user.user);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("Selected file:", e.target.files[0]);
  };

  const handlePost = async () => {
    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("media", selectedFile);
    formData.append("userId", user?._id);

    console.log("FormData:", formData);

    try {
      const response = await fetch(AllApiUrls.createStory.Url, {
        method: AllApiUrls.createStory.method,
        credentials: "include",
        body: formData,
      });

      console.log("API Response:", response);

      if (!response.ok) {
        const errorData = await response.text();
        console.log("API Error Response:", errorData);
        throw new Error(errorData);
      }

      const data = await response.json();
      console.log("API Success Data:", data);
      toast.success(data.message);
      onSubmit(data.story);
    } catch (error) {
      toast.error("Failed to create story");
      console.log("create story error:", error.message || error);
    }
  };

  return (
    <div className="inset-0 bg-opacity-75 flex items-center justify-center mt-4 border border-gray-300">
      <div className="bg-white w-full max-w-md p-4 my-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Story</h2>
          <button className="text-red-500" onClick={onCancel}>
            Cancel
          </button>
        </div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="w-full h-auto rounded-md mb-4"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStoryModal;
