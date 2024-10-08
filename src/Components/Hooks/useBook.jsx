import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: booking = [], refetch } = useQuery({
    queryKey: ["booking", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });
  return [booking, refetch];
};

export default useBook;
