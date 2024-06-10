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

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [admin, setAdmin] = useState();
  const [loginStatus, setLoginStatus] = useState();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user) {
        try {
          const response = await axiosSecure.get(`/users/admin/${user.email}`);
          // console.log("Admin status:", response.data.admin);
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
          // console.log("Login User status:", response.data.status);
          setLoginStatus(response.data.status);
        } catch (error) {
          console.error("Error fetching status:", error);
        }
      }
    };

    fetchAdminStatus();
    fetchLoginStatus();
  }, [user, axiosSecure]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 lg:min-h-screen bg-primary p-6">
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
          {/* {!isAdmin ? (
            
          ) : (
           
          )} */}
        </ul>
      </div>
      <div className="w-full md:w-3/4 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
