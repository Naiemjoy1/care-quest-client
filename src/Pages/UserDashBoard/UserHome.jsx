import { useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import EmailUser from "./EmailUser";

const image_hosting_key = import.meta.env.VITE_IMGBB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UserHome = () => {
  const { user, updateUserProfile } = useAuth();
  console.log("user detail", user);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [image, setImage] = useState(user.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    let photo = image;

    setLoading(true); // Start loading

    if (image !== user.photoURL) {
      const imageFile = await fetch(image)
        .then((res) => res.blob())
        .catch((error) => {
          console.error("Error fetching image:", error);
          setLoading(false); // Stop loading on error
          return null;
        });

      if (!imageFile) {
        console.error("Failed to convert image to Blob");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();

        if (data.data.url) {
          photo = data.data.url;
          console.log("Uploaded image link:", photo);
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to upload image. Please try again.",
        });
        setLoading(false); // Stop loading on error
        return;
      }
    }

    // Update user profile with the new information
    updateUserProfile(displayName, photo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully!",
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update profile. Please try again later.",
        });
      })
      .finally(() => {
        setLoading(false); // Stop loading after updating profile
      });
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8  border-4 rounded-full text-blue-600"
            role="status"
          >
            <span className="loading loading-spinner text-4xl text-primary"></span>
          </div>
        </div>
      )}
      <div className="flex">
        <div className="w-1/2 bg-primary py-7 px-4 flex flex-col items-center justify-center">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full">
              <img src={image} alt="User Avatar" />
            </div>
          </div>
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
          />
        </div>

        <div className="w-1/2 bg-secondary grid grid-cols-1 gap-4 text-white py-7 px-4">
          <div>
            <label htmlFor="displayName">Name: </label>
            <input
              className="bg-secondary border-none px-2"
              defaultValue={displayName}
              type="text"
              id="displayName"
              value={displayName}
              onChange={handleDisplayNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: {user.email}</label>
          </div>
          <button
            className="btn btn-primary btn-sm text-white"
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
