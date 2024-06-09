import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Banner from "./Banner";
import Swal from "sweetalert2";

const AllBanner = () => {
  const axiosSecure = useAxiosSecure();
  const [checkedBannerId, setCheckedBannerId] = useState(null);

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });

  // If the same checkbox is clicked again, uncheck it
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

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Banner is updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating isActive field:", error);
    }
  };

  return (
    <div className="flex">
      <div className="grid grid-rows-1 w-3/4 gap-4">
        {banners.map((banner) => (
          <Banner
            key={banner._id}
            banner={banner}
            isChecked={checkedBannerId === banner._id}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBanner;
