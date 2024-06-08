import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useReview from "../../Components/Hooks/useReview";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import ReviewSlider from "./ReviewSlider";

const MakeReview = ({ _id }) => {
  const { user } = useAuth();
  const [reviews] = useReview();
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = {
        title: data.title,
        description: data.message,
        source: data.profession,
        rating: rating,
        image: user.photoURL,
        name: user.displayName,
        email: user.email,
      };
      const res = await axiosPublic.post("/reviews", formData);
      if (res.data.insertedId) {
        console.log("added to the database");
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review Submitted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex gap-8 mb-10">
      <div className="w-1/2 space-y-4">
        <ReviewSlider reviews={reviews} _id={_id}></ReviewSlider>
      </div>
      <div className="w-1/2 bg-primary p-6 rounded-lg">
        <h2 className="text-3xl font-semibold text-center">
          Your opinion matters!
        </h2>
        <div className="flex flex-col items-center">
          <span className="text-center">How was your experience?</span>
        </div>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            {/* Updated the Rating component to pass the setRating function */}
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating} // Update the rating value on change
              isRequired
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="title"
              placeholder="Title For Review"
              className="p-4 rounded-md resize-none text-white bg-secondary"
              {...register("title")}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="profession"
              placeholder="Your Profession"
              className="p-4 rounded-md resize-none text-white bg-secondary"
              {...register("profession")}
            />
          </div>
          <div className="form-control">
            <textarea
              rows="3"
              name="message"
              placeholder="Message..."
              className="p-4 rounded-md resize-none text-white bg-secondary"
              {...register("message")}
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-secondary text-white" type="submit">
              Leave feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeReview;
