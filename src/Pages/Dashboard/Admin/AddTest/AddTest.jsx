import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMGBB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [timeSlots, setTimeSlots] = useState([
    { hour: "", minute: "", period: "" },
    { hour: "", minute: "", period: "" },
    { hour: "", minute: "", period: "" },
    { hour: "", minute: "", period: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    // image upload to imgbb
    const imageFile = new FormData();
    imageFile.append("image", data.image[0]);

    try {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log("Image Upload Response: ", res.data);

      if (res.data.success) {
        // Combine selected time slots
        const slots = timeSlots.map(
          (slot) => `${slot.hour}:${slot.minute} ${slot.period}`
        );

        // now send the tests item
        const testsItem = {
          name: data.name,
          image: res.data.data.display_url,
          description: data.Tests,
          price: parseFloat(data.price),
          date: data.date,
          category: data.category,
          capacity: parseInt(data.capacity),
          slots: slots,
        };

        const testsRes = await axiosSecure.post("/tests", testsItem);
        console.log(testsRes.data);

        if (testsRes.data.insertedId) {
          // show success popup
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
            title: `${data.name} is added to the tests`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload image. Please try again.",
      });
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
            className="spinner-border animate-spin inline-block w-8 h-8  border-4 rounded-full text-blue-600"
            role="status"
          >
            <span className="loading loading-spinner text-4xl text-primary"></span>
          </div>
        </div>
      )}
      <h2 className="text-center font-bold text-2xl">Add Test</h2>
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
          <div className="lg:flex gap-4">
            <div className="form-control lg:w-1/2">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>

              <select
                defaultValue="null"
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
            <div className="form-control lg:w-1/2">
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
          <div className="lg:flex justify-between gap-4">
            {/* New form fields */}
            <div className="form-control lg:w-1/2">
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
            <div className="form-control lg:w-1/2">
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

            {/* End of new form fields */}
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
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
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Tests Details*</span>
            </label>
            <textarea
              type="text"
              name="Tests"
              placeholder="Tests Details"
              className="textarea textarea-bordered"
              {...register("Tests", { required: true })}
            />
            {errors.Tests && <span>This field is required</span>}
          </div>
          <div className="form-control ">
            <input
              type="file"
              name="image"
              className="file-input w-full max-w-xs"
              {...register("image", { required: true })}
            />
            {errors.image && <span>This field is required</span>}
          </div>

          <div className="form-control mt-6 ">
            <button className="btn btn-primary max-w-xs text-white">
              Add Test <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
