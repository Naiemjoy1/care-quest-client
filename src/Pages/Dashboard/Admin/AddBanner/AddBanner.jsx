import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddBanner = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const image_hosting_key = import.meta.env.VITE_IMGBB_API;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      // If successful, log the uploaded image URL
      if (result.data) {
        const bannerImg = result.data.image.url;
        console.log("Banner image link:", bannerImg);

        // Log the form data with the banner image link
        const bannerItem = {
          bannertitle: data.bannertitle,
          description: data.description,
          cupontitle: data.cupontitle,
          cupondescrioption: data.cupondescrioption,
          expiry: data.expiry,
          cuponcode: data.cuponcode,
          rate: data.rate + "%",
          image: bannerImg,
          isActive: false,
        };
        console.log("Banner item:", bannerItem);

        axiosSecure.post("/banners", bannerItem).then((res) => {
          if (res.data.insertedId) {
            console.log("added to the database");
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Banner Created Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } else {
        console.error("Error uploading image:", result.error.message);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="gap-4">
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Banner Title</span>
              </label>
              <input
                type="text"
                name="bannertitle"
                placeholder="Banner Title"
                className="input input-bordered"
                {...register("bannertitle", { required: true })}
              />
              {errors.bannertitle && <span>This field is required</span>}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Banner Description</span>
              </label>
              <input
                type="text"
                name="description"
                placeholder="Banner Description"
                className="input input-bordered"
                {...register("description", { required: true })}
              />
              {errors.description && <span>This field is required</span>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Cupon Title</span>
              </label>
              <input
                type="text"
                name="cupontitle"
                placeholder="Cupon Title"
                className="input input-bordered"
                {...register("cupontitle", { required: true })}
              />
              {errors.cupontitle && <span>This field is required</span>}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Cupon Description</span>
              </label>
              <input
                type="text"
                name="cupondescrioption"
                placeholder="Cupon Description"
                className="input input-bordered"
                {...register("cupondescrioption", { required: true })}
              />
              {errors.cupondescrioption && <span>This field is required</span>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Expiry</span>
              </label>
              <input
                type="date"
                name="expiry"
                placeholder="Expiry"
                className="input input-bordered"
                {...register("expiry", { required: true })}
              />
              {errors.expiry && <span>This field is required</span>}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Cupon Code</span>
              </label>
              <input
                type="text"
                name="cuponcode"
                placeholder="Cupon Code"
                className="input input-bordered"
                {...register("cuponcode", { required: true })}
              />
              {errors.cuponcode && <span>This field is required</span>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Discount Rate</span>
              </label>
              <input
                type="number"
                name="rate"
                placeholder="Discount Rate"
                className="input input-bordered"
                {...register("rate", { required: true })}
              />
              {errors.rate && <span>This field is required</span>}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Banner Image</span>
              </label>
              <input
                type="file"
                name="Banner Image"
                className="file-input w-full max-w-xs"
                {...register("image", { required: true })}
              />
              {errors.image && <span>This field is required</span>}
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Add Banner</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
