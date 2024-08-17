import { useState } from "react";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        let result = reader.result;

        // For demonstration, assuming Cloudinary URL pattern:
        if (result.includes("cloudinary.com")) {
          // Example transformation: reduce width and quality
          const cloudinaryUrl = new URL(result);
          const params = "c_scale,w_400,q_auto"; // Sample transformation parameters
          const pathParts = cloudinaryUrl.pathname.split("/");

          // Insert transformation parameters after "/upload/"
          pathParts.splice(pathParts.indexOf("upload") + 1, 0, params);
          cloudinaryUrl.pathname = pathParts.join("/");

          result = cloudinaryUrl.toString();
        }

        setImgUrl(result);
      };

      reader.readAsDataURL(file);
    } else {
      console.log("Selected file is not an image");
      setImgUrl(null);
    }
  };

  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
