import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddBanner = () => {
  const image_hosting_key = import.meta.env.VITE_IMGBB_API;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("couponCode", data.couponCode);
    formData.append("couponRate", data.couponRate);
    formData.append("isActive", data.isActive);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      const displayUrl = result.data.display_url;
      console.log("Uploaded Image URL:", displayUrl);

      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Created Banner Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="gap-4">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Banner Name</span>
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

          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Banner Image</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input w-full max-w-xs"
              {...register("image", { required: true })}
            />
            {errors.image && <span>This field is required</span>}
          </div>

          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Banner Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Banner Title"
              className="input input-bordered"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>

          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Banner Description</span>
            </label>
            <textarea
              type="text"
              name="description"
              placeholder="Banner Description"
              className="input input-bordered"
              {...register("description", { required: true })}
            />
            {errors.description && <span>This field is required</span>}
          </div>

          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Coupon Code</span>
            </label>
            <input
              type="text"
              name="couponCode"
              placeholder="Coupon Code"
              className="input input-bordered"
              {...register("couponCode")}
            />
          </div>

          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Coupon Rate</span>
            </label>
            <input
              type="number"
              name="couponRate"
              placeholder="Coupon Rate"
              className="input input-bordered"
              {...register("couponRate")}
            />
          </div>

          <div className="form-control w-1/2">
            <label className="label">
              <input
                type="checkbox"
                name="isActive"
                className="checkbox checkbox-primary"
                {...register("isActive")}
              />
              <span className="label-text">Active</span>
            </label>
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
