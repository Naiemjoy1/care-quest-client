import { useEffect, useState } from "react";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useAuth from "../../Components/Hooks/useAuth";

const FunctionTest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [admin, setAdmin] = useState();
  const [loginStatus, setLoginStatus] = useState();
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user) {
        try {
          const response = await axiosSecure.get(`/users/admin/${user.email}`);
          //   console.log("Admin status:", response.data.admin);
          setAdmin(response.data.admin);
        } catch (error) {
          console.error("Error fetching admin status:", error);
        }
      }
    };

    const fetchLoginStatus = async () => {
      if (user) {
        try {
          const response = await axiosSecure.get(`/users/status/${user.email}`);
          //   console.log("Login User status:", response.data.status);
          setLoginStatus(response.data.status);
        } catch (error) {
          console.error("Error fetching status:", error);
        } finally {
          setLoading(false); // Set loading state to false when data is fetched
        }
      }
    };

    fetchAdminStatus();
    fetchLoginStatus();
  }, [user, axiosSecure]);

  return (
    <div>
      {loading ? (
        <div className="absolute inset-0 lg:flex  items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
            role="status"
          >
            <span className="loading loading-spinner text-4xl text-primary"></span>
          </div>
        </div>
      ) : (
        <>
          <h2>Admin:</h2>
          <p>Status: {admin ? "Admin" : "Not Admin"}</p>
          {admin ? <button>Hello</button> : <button>bye</button>}
          <h2>Login Status:</h2>
          <p>Status: {loginStatus ? "Active" : "Inactive"}</p>
        </>
      )}
    </div>
  );
};

export default FunctionTest;
