import {
  FaClipboardList,
  FaHome,
  FaHouseUser,
  FaRegImage,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { BiSolidImageAdd } from "react-icons/bi";
import { PiListDashesFill, PiListPlusFill } from "react-icons/pi";
import { BsBookmarksFill } from "react-icons/bs";
import { MdBookmarkAdded } from "react-icons/md";
import { useEffect, useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useAdmin from "../../Components/Hooks/useAdmin";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [admin, setAdmin] = useState(null); // Initialize admin state as null
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user) {
        try {
          const response = await axiosSecure.get(`/users/admin/${user.email}`);
          setAdmin(response.data.admin);
        } catch (error) {
          console.error("Error fetching admin status:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching admin status
        }
      }
    };

    fetchAdminStatus();
  }, [user, axiosSecure]);

  // Render loading indicator if loading is true or admin state is null
  // if (loading || admin === null) {
  //   return (
  //     <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
  //       <div
  //         className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
  //         role="status"
  //       >
  //         <span className="loading loading-spinner text-4xl text-primary"></span>
  //       </div>
  //     </div>
  //   );
  // }

  // Render dashboard content based on admin status

  const [isAdmin] = useAdmin();

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 lg:min-h-screen bg-primary p-6">
        {/* {isAdmin ? <button>Hello</button> : <button>bye</button>} */}
        <ul className="menu text-white text-lg gap-4">
          {admin ? (
            <>
              <li>
                <NavLink to="/dashboard/admin" activeClassName="bg-primary">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addbanner" activeClassName="bg-primary">
                  <BiSolidImageAdd /> Add Banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allbanner" activeClassName="bg-primary">
                  <FaRegImage /> All Banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users" activeClassName="bg-primary">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addtest" activeClassName="bg-primary">
                  <PiListPlusFill /> Add Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tests" activeClassName="bg-primary">
                  <PiListDashesFill /> All Tests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reservations"
                  activeClassName="bg-primary"
                >
                  <BsBookmarksFill /> Reservations
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/user" activeClassName="bg-primary">
                  <FaHouseUser /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/appointments"
                  activeClassName="bg-primary"
                >
                  <MdBookmarkAdded /> Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/testresults"
                  activeClassName="bg-primary"
                >
                  <FaClipboardList /> Test Results
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="w-full md:w-3/4 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
