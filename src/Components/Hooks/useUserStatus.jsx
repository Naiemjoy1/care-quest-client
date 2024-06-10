import { useState, useEffect } from "react";
// import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import axios from "axios";

const useUserStatus = () => {
  const { user } = useAuth();
  // const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUserStatus = async () => {
  //     if (user) {
  //       try {
  //         const response = await axiosSecure.get(`/users/status/${user.email}`);
  //         setStatus(response.data.status);
  //         setRole(response.data.role);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     } else {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUserStatus();
  // }, [user, axiosSecure]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !user) {
          setStatus(false);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`/users/status/${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStatus(response.data.admin);
      } catch (error) {
        console.error("Error fetching admin status:", error);
        setStatus(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminStatus();
  }, [user]);

  return { status, isLoading };
};

export default useUserStatus;
