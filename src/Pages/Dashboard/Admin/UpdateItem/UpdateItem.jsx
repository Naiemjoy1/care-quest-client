import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import { useState } from "react";
import useTests from "../../../../Components/Hooks/useTests";
import { useParams } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMGBB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
// console.log("API Key:", image_hosting_key);
// console.log("API Endpoint:", image_hosting_api);

const UpdateItem = () => {
  const { _id } = useParams();
  const [tests] = useTests();
  const foundTest = tests.find((test) => test._id === _id);

  const { name, category, capacity, date, description, image, price, slots } =
    foundTest;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      category,
      price,
      date,
      capacity,
      Tests: description,
    },
  });

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [timeSlots, setTimeSlots] = useState(
    slots.map((slot) => {
      const [time, period] = slot.split(" ");
      const [hour, minute] = time.split(":");
      return { hour, minute, period };
    })
  );

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    let imageUrl = image;

    if (data.image && data.image.length > 0) {
      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      try {
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        // console.log("Image Upload Response:", res.data);

        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error(
          "Error uploading image:",
          error.response?.data || error.message
        );
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to upload image. Please try again.",
        });
        return;
      }
    }

    const slots = timeSlots.map(
      (slot) => `${slot.hour}:${slot.minute} ${slot.period}`
    );
    const testsItem = {
      name: data.name,
      image: imageUrl,
      description: data.Tests,
      price: parseFloat(data.price),
      date: data.date,
      category: data.category,
      capacity: parseInt(data.capacity),
      slots: slots,
    };

    try {
      const testsRes = await axiosSecure.patch(`/tests/${_id}`, testsItem);
      // console.log("Test Update Response:", testsRes.data);

      if (testsRes.data.modifiedCount > 0) {
        reset();
        setTimeSlots([
          { hour: "", minute: "", period: "" },
          { hour: "", minute: "", period: "" },
          { hour: "", minute: "", period: "" },
          { hour: "", minute: "", period: "" },
        ]);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the tests`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(
        "Error updating test:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update test. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Hematology",
    "Cardiology",
    "Endocrinology",
    "Urology",
    "Hepatology",
    "Nephrology",
    "Radiology",
    "Oncology",
    "Gynecology",
    "Nutrition",
    "Immunology",
    "Virology",
    "Gastroenterology",
    "General Health",
    "Orthopedics",
    "Pulmonology",
    "Infectious Diseases",
  ];

  const handleSlotChange = (index, key, value) => {
    const newSlots = [...timeSlots];
    newSlots[index][key] = value;
    setTimeSlots(newSlots);
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
            role="status"
          >
            <span className="loading loading-spinner text-4xl text-primary"></span>
          </div>
        </div>
      )}
      <h2>Update Test</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tests name*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Tests Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                name="category"
                className="select select-bordered w-full"
                {...register("category", { required: true })}
              >
                <option value="null" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <span>This field is required</span>}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered"
                {...register("price", { required: true })}
              />
              {errors.price && <span>This field is required</span>}
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Date*</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered"
                {...register("date", { required: true })}
              />
              {errors.date && <span>This field is required</span>}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Capacity*</span>
              </label>
              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                className="input input-bordered"
                {...register("capacity", { required: true })}
              />
              {errors.capacity && <span>This field is required</span>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {timeSlots.map((slot, index) => (
              <div key={index} className="form-control">
                <label className="label">
                  <span className="label-text">Slot {index + 1}*</span>
                </label>
                <div className="flex gap-2 w-1/2">
                  {/* Hour */}
                  <select
                    className="select select-bordered"
                    value={slot.hour}
                    onChange={(e) =>
                      handleSlotChange(index, "hour", e.target.value)
                    }
                  >
                    <option value="">Hour</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  {/* Minute */}
                  <select
                    className="select select-bordered"
                    value={slot.minute}
                    onChange={(e) =>
                      handleSlotChange(index, "minute", e.target.value)
                    }
                  >
                    <option value="">Minute</option>
                    {Array.from({ length: 60 }, (_, i) => i).map((min) => (
                      <option key={min} value={min}>
                        {min < 10 ? `0${min}` : min}
                      </option>
                    ))}
                  </select>
                  {/* Period */}
                  <select
                    className="select select-bordered"
                    value={slot.period}
                    onChange={(e) =>
                      handleSlotChange(index, "period", e.target.value)
                    }
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tests Details*</span>
            </label>
            <textarea
              name="Tests"
              className="textarea textarea-bordered"
              placeholder="Tests Details"
              {...register("Tests", { required: true })}
            ></textarea>
            {errors.Tests && <span>This field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered"
              {...register("image")}
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Update Item <FaUtensils className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
