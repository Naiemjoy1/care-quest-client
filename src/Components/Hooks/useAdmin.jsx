import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !user) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`/users/status/${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAdmin(response.data.admin);
      } catch (error) {
        console.error("Error fetching admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminStatus();
  }, [user]);

  return { isAdmin, isLoading };
};

export default useAdmin;
