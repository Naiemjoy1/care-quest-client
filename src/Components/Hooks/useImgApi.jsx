import { useState } from "react";
import axios from "axios";

const useImgApi = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const apiKey = import.meta.env.VITE_IMGBB_API;
      console.log("API Key:", apiKey);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response Data:", data);

      const url = data.data.display_url;
      setImageUrl(url);
      console.log("Image uploaded successfully:", url); // Log the uploaded image URL
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      throw error;
    }
  };

  return { imageUrl, uploadImage };
};

export default useImgApi;
