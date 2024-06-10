import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useAuth from "../../../../Components/Hooks/useAuth";

const AddReview = ({ _id, onCloseModal }) => {
  const { user } = useAuth() || {}; // Ensure user is properly handled even if undefined
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

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
        // console.log("added to the database");
        reset();
        setRating(0);
        onCloseModal(); // Reset the rating
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
    <div className=" ">
      <div className=" bg-primary p-6 rounded-lg">
        <h2 className="text-3xl font-semibold text-center">Add Review</h2>

        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control flex justify-center items-center">
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
            <button className="btn btn-secondary text-white" type="submit">
              {loading ? (
                <span className="loading loading-ring loading-sm"></span>
              ) : (
                "Leave feedback"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
