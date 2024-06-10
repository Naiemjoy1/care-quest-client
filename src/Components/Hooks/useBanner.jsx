import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBanner = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: banners = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data;
    },
  });
  return [banners, isLoading, isError, refetch];
};

export default useBanner;
