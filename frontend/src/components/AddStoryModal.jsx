// AddStoryModal.js
import React, { useState } from 'react';

const AddStoryModal = ({ onSubmit, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePost = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newStory = { id: Date.now().toString(), username: 'You', imgSrc: e.target.result };
      onSubmit(newStory);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center mt-4">
      <div className="bg-white w-full max-w-md p-4 rounded-lg my-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Story</h2>
          <button className="text-red-500" onClick={onCancel}>Cancel</button>
        </div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
          <div className="mt-4">
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-full h-auto rounded-md mb-4" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handlePost}>Post</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStoryModal;
