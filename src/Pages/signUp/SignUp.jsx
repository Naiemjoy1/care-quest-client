import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import signup from "../../assets/signup.png";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const districts = {
  Dhaka: ["Dhanmondi", "Gulshan", "Mirpur"],
  Chittagong: ["Pahartali", "Panchlaish", "Patenga"],
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SignUp = () => {
  const { createuser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMGBB_API;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = data.image[0];
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const bloodGroup = data.bloodGroup;
    const district = data.district;
    const upazila = data.upazila;

    console.log("Form data:", data);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      const displayUrl = result.data.display_url;
      console.log("Name:", name);
      console.log("Uploaded Image URL:", displayUrl);
      console.log("Email:", email);

      // Create user
      const userResult = await createuser(email, password);
      console.log("Created user:", userResult);

      // Save username and photo
      await updateUserProfile(name, displayUrl);
      console.log("Updated user profile with name and image URL");
      //create user database
      const userInfo = {
        name,
        email,
        image: displayUrl,
        bloodGroup,
        district,
        upazila,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          console.log("added to the database");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Created Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      });
    } catch (error) {
      console.error("Error in onSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  // Watch the password field to validate confirm password
  const password = watch("password");

  return (
    <div className="flex container justify-center mx-auto items-center gap-4 my-14">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
            role="status"
          >
            <span className="loading loading-spinner text-4xl text-primary"></span>
          </div>
        </div>
      )}
      <div className="w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex gap-4">
            {/* name input  */}
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
            </div>

            {/* email  */}
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && <span>This field is required</span>}
            </div>
          </div>

          <div className="flex gap-4 ">
            {/* image  */}
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Profile Image</span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input w-full max-w-xs"
                {...register("image", { required: true })}
              />
              {errors.image && <span>This field is required</span>}
            </div>

            {/* blood  */}
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                name="bloodGroup"
                className="input input-bordered"
                {...register("bloodGroup", { required: true })}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && <span>This field is required</span>}
            </div>
          </div>

          <div className="flex gap-4 ">
            {/* district  */}
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select
                name="district"
                className="input input-bordered"
                {...register("district", { required: true })}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {Object.keys(districts).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && <span>This field is required</span>}
            </div>

            {/* upazila  */}
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <select
                name="upazila"
                className="input input-bordered"
                {...register("upazila", { required: true })}
              >
                <option value="">Select Upazila</option>
                {selectedDistrict &&
                  districts[selectedDistrict].map((upazila) => (
                    <option key={upazila} value={upazila}>
                      {upazila}
                    </option>
                  ))}
              </select>
              {errors.upazila && <span>This field is required</span>}
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.])(?=.*[a-z])/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one uppercase, one lowercase, one number,
                  and one special character
                </p>
              )}
            </div>

            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Register</button>
          </div>

          <p className="mt-5 text-center">
            Already Have an Account?{" "}
            <Link to="/signin" className="text-primary">
              Login
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
      <div>
        <img src={signup} alt="" />
      </div>
    </div>
  );
};

export default SignUp;
