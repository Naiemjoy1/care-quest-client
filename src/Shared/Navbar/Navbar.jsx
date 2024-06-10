import { Link, NavLink } from "react-router-dom";
import useBook from "../../Components/Hooks/useBook";
import useAuth from "../../Components/Hooks/useAuth";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import useUserStatus from "../../Components/Hooks/useUserStatus";
import useAdmin from "../../Components/Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState("light");
  const [booking] = useBook();
  const { status: userStatus } = useUserStatus();
  const { isAdmin } = useState();

  const userBookings = booking.filter((book) => book.email === user?.email);

  console.log("login user role", isAdmin);
  console.log("login user status", userStatus);

  const navLink = (
    <>
      <li>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#47ccc8", color: "white" } : {}
          }
          activeClassName="bg-primary text-white"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tests"
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#47ccc8", color: "white" } : {}
          }
          activeClassName="bg-primary text-white"
        >
          All Tests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/doctors"
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#47ccc8", color: "white" } : {}
          }
          activeClassName="bg-primary text-white"
        >
          Doctors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#47ccc8", color: "white" } : {}
          }
          activeClassName="bg-primary text-white"
        >
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#47ccc8", color: "white" } : {}
          }
          activeClassName="bg-primary text-white"
        >
          About
        </NavLink>
      </li>

      {user && userStatus === "active" && (
        <li>
          {!isAdmin ? (
            <NavLink
              to="/dashboard/admin"
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#47ccc8", color: "white" } : {}
              }
              activeClassName="bg-primary text-white"
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="/dashboard/user"
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#47ccc8", color: "white" } : {}
              }
              activeClassName="bg-primary text-white"
            >
              Dashboard
            </NavLink>
          )}
        </li>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "synthwave" : "light");
  };

  return (
    <div className="navbar bg-secondary text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary text-white rounded-box w-52"
          >
            {navLink}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          CareQuest
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLink}</ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          userStatus === "active" ? (
            <button className="badge badge-success">Active</button>
          ) : userStatus === "blocked" ? (
            <button className="badge badge-warning">Blocked</button>
          ) : null
        ) : null}

        <button className="btn btn-sm">
          <FaCartPlus />
          <div className="badge badge-primary">+{userBookings.length}</div>
        </button>
        {user ? (
          <div className="dropdown dropdown-hover dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                  }
                  alt=""
                />
              </div>
            </label>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary text-white rounded-box w-52">
              <li>
                <button className="btn btn-sm btn-ghost">
                  <Link to="/userupdate">
                    {user?.displayName || user?.email}
                  </Link>
                </button>
              </li>
              <li>
                <button onClick={handleLogOut} className="btn btn-sm btn-ghost">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin" className="btn btn-sm bg-primary text-white">
            Login
          </Link>
        )}
        <label className="cursor-pointer grid place-items-center ml-4">
          <input
            onChange={handleToggle}
            type="checkbox"
            className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
          />
          <svg
            className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
