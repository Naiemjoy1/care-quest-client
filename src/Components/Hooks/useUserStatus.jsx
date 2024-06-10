import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (user) {
        try {
          const response = await axiosSecure.get(`/users/status/${user.email}`);
          setStatus(response.data.status);
          setRole(response.data.role);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserStatus();
  }, [user, axiosSecure]);

  return { status, role, isLoading, error };
};

export default useUserStatus;
