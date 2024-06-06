// useAllBookings.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllBookings = () => {
  const axiosSecure = useAxiosSecure();

  // Query to fetch all bookings
  const { data: allBookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/all");
      return res.data;
    },
    enabled: false, // Only fetch when necessary
  });

  return [allBookings, refetch];
};

export default useAllBookings;
