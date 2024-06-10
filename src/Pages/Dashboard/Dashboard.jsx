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
    <div className="flex">
      <div className="w-1/4 min-h-screen bg-primary p-6">
        <ul className="menu text-white text-lg gap-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/admin"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addbanner"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <BiSolidImageAdd /> Add Banner
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/allbanner"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <FaRegImage /> All Banner
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addtest"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <PiListPlusFill /> Add Test
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/tests"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <PiListDashesFill /> All Tests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reservations"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <BsBookmarksFill /> Reservations
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/user"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <FaHouseUser /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/appointments"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <MdBookmarkAdded /> Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/testresults"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <FaClipboardList /> Test Results
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="w-3/4 flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
