import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Banner from "./Banner";

const AllBanner = () => {
  const axiosSecure = useAxiosSecure();

  const { data: banners = {} } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });
  return (
    <div>
      <h2>AllBanner:{banners.length}</h2>
      {banners.map((banner) => (
        <Banner key={banner._id} banner={banner}></Banner>
      ))}
    </div>
  );
};

export default AllBanner;
