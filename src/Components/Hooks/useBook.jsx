import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: booking = [],
    refetch,
    error,
  } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/bookings?email=${user.email}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching bookings:", error.response || error);
        throw error;
      }
    },
  });

  if (error) {
    console.error("Error in useBook:", error);
  }

  return [booking, refetch];
};

export default useBook;
