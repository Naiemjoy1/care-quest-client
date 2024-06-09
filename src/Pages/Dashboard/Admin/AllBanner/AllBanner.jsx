import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import { useState } from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";

const AllBanner = () => {
  const axiosSecure = useAxiosSecure();
  const [checkedBannerId, setCheckedBannerId] = useState(null);
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });

  const handleCheckboxChange = async (id) => {
    try {
      if (checkedBannerId === id) {
        await axiosSecure.patch(`/banners/${id}`, { isActive: false });
        setCheckedBannerId(null);
      } else {
        if (checkedBannerId !== null) {
          await axiosSecure.patch(`/banners/${checkedBannerId}`, {
            isActive: false,
          });
        }
        await axiosSecure.patch(`/banners/${id}`, { isActive: true });
        setCheckedBannerId(id);
      }
      refetch();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Banner is updated",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error updating isActive field:", error);
    }
  };

  const handleDelete = (banner) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/banners/${banner._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="flex">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Active</th>
              <th>Banner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {banners.map((banner) => (
              <tr key={banner._id}>
                <th>
                  <input
                    type="checkbox"
                    defaultChecked={banner.isActive}
                    className="checkbox checkbox-xs"
                    onChange={() => handleCheckboxChange(banner._id)}
                  />
                </th>
                <td>
                  {" "}
                  <div
                    className="hero "
                    style={{
                      backgroundImage: `url(${banner.image})`,
                    }}
                  >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className=" text-neutral-content">
                      <div className="flex justify-center gap-4 items-center p-4 text-sm">
                        <div className="w-1/2 space-y-2">
                          <h1 className="font-bold">{banner.bannertitle}</h1>
                          <p className="">{banner.description}</p>
                          <Link to="/tests">
                            <button className="btn btn-sm btn-primary text-white">
                              Get All Test
                            </button>
                          </Link>
                        </div>
                        <div className="w-1/2 space-y-2">
                          <p className=" font-bold">{banner.cupontitle}</p>
                          <section className="flex gap-2 items-center">
                            <p className="font-bold text-2xl text-primary">
                              {banner.rate}
                            </p>
                            <div>
                              <p>Cupon Code: {banner.cuponcode}</p>
                              <p>Expiry: {banner.expiry}</p>
                            </div>
                          </section>
                          <p>{banner.cupondescrioption}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(banner)}
                    className="btn btn-accent text-white btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBanner;
