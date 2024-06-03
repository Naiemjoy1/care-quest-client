import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/4 min-h-screen bg-primary p-6">
        <ul className="menu text-white text-lg gap-4">
          <li>
            <NavLink
              to="/dashboard/admin"
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#2d3663", color: "white" } : {}
              }
            >
              <FaHome></FaHome> Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addbanner"
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#2d3663", color: "white" } : {}
              }
            >
              <FaHome></FaHome> Add Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-3/4 flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
