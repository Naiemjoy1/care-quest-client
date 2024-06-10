import { useState } from "react";
import { useForm } from "react-hook-form";
import useReview from "../../Components/Hooks/useReview";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import ReviewSlider from "./ReviewSlider";

const MakeReview = ({ _id, isBooked }) => {
  const { user } = useAuth() || {}; // Ensure user is properly handled even if undefined
  const [reviews, isLoading, isError, refetchReviews] = useReview();
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const filteredReviews = reviews.filter(
    (review) => review.reviewsId === _id && review.email === user?.email
  );
  console.log("Filtered Reviews:", filteredReviews);

  const onSubmit = async (data) => {
    if (rating === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Rating is required.",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = {
        title: data.title,
        description: data.message,
        source: data.profession,
        rating: rating,
        image: user?.photoURL,
        name: user?.displayName,
        email: user?.email,
        reviewsId: _id,
      };
      const res = await axiosPublic.post("/reviews", formData);
      if (res.data.insertedId) {
        console.log("added to the database");
        reset();
        setRating(0); // Reset the rating
        refetchReviews();
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

  console.log("book data in review", isBooked);

  return (
    <div className="container mx-auto flex gap-8 mb-10">
      <div className="w-1/2 space-y-4">
        <ReviewSlider reviews={reviews} _id={_id}></ReviewSlider>
      </div>
      <div className="w-1/2">
        {isBooked ? (
          <div className="bg-primary p-6 rounded-lg">
            <h2 className="text-3xl font-semibold text-center">
              Your opinion matters!
            </h2>
            <div className="flex flex-col items-center">
              <span className="text-center">How was your experience?</span>
            </div>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={rating}
                  onChange={setRating}
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  name="title"
                  placeholder="Title For Review"
                  className="p-4 rounded-md resize-none text-white bg-secondary"
                  {...register("title", { required: "Title is required." })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <input
                  type="text"
                  name="profession"
                  placeholder="Your Profession"
                  className="p-4 rounded-md resize-none text-white bg-secondary"
                  {...register("profession", {
                    required: "Profession is required.",
                  })}
                />
                {errors.profession && (
                  <span className="text-red-500 text-sm">
                    {errors.profession.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <textarea
                  rows="3"
                  name="message"
                  placeholder="Message..."
                  className="p-4 rounded-md resize-none text-white bg-secondary"
                  {...register("message", { required: "Message is required." })}
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    {errors.message.message}
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                {filteredReviews.length === 0 ? (
                  <button
                    className="btn btn-secondary text-white"
                    type="submit"
                  >
                    {loading ? (
                      <span className="loading loading-ring loading-sm"></span>
                    ) : (
                      "Leave feedback"
                    )}
                  </button>
                ) : (
                  <p className="text-center text-secondary font-semibold">
                    Already Submitted
                  </p>
                )}
              </div>
            </form>
          </div>
        ) : (
          <p className="text-center text-secondary font-semibold">
            Please book a test before leaving a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default MakeReview;
