import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  // ToDo
  const isAdmin = true;

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
                  <FaHome></FaHome> Admin Home
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
                  <FaHome></FaHome> Add Menu
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
                  <FaHome></FaHome> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/userhome"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#2d3663", color: "white" }
                      : {}
                  }
                >
                  <FaHome></FaHome> User Home
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
                  <FaHome></FaHome> Appointments
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
                  <FaHome></FaHome> Testresults
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="w-3/4 flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
