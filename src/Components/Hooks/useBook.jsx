import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: booking = [], refetch } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });
  return [booking, refetch];
};

export default useBook;
