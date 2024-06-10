import {
  FaClipboardList,
  FaHome,
  FaHouseUser,
  FaRegImage,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Components/Hooks/useAdmin";
import { BiSolidImageAdd } from "react-icons/bi";
import { PiListDashesFill, PiListPlusFill } from "react-icons/pi";
import { BsBookmarksFill } from "react-icons/bs";
import { MdBookmarkAdded } from "react-icons/md";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 lg:min-h-screen bg-primary p-6">
        <ul className="menu text-white text-lg gap-4">
          {isAdmin ? (
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
