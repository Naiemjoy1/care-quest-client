import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/signUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoutes from "../Components/Private/PrivateRoute";
import AllTests from "../Pages/AllTests/AllTests";
import Error from "../Shared/Error/Error";
import AddBanner from "../Pages/Dashboard/Admin/AddBanner/AddBanner";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import TestDetails from "../Pages/AllTests/TestDetails";
import UserHome from "../Pages/UserDashBoard/UserHome";
import Appointments from "../Pages/UserDashBoard/Appointments";
import TestResults from "../Pages/UserDashBoard/TestResults";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import AddTest from "../Pages/Dashboard/Admin/AddTest/AddTest"; // Make sure to import AddTest
import Tests from "../Pages/Dashboard/Admin/Tests/Tests";
import Reservations from "../Pages/Dashboard/Admin/Reservations/Reservations";
import AllBanner from "../Pages/Dashboard/Admin/AllBanner/AllBanner";
import UpdateItem from "../Pages/Dashboard/Admin/UpdateItem/UpdateItem";
import MakeReview from "../Pages/AllTests/MakeReview";
import AddReview from "../Pages/Dashboard/Admin/AddReview/AddReview";
import Doctors from "../Pages/Doctors/Doctors";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/tests",
        element: <AllTests></AllTests>,
      },
      {
        path: "/tests/:_id",
        element: <TestDetails></TestDetails>,
        loader: () => fetch("featuredTests.json"),
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/doctors",
        element: <Doctors></Doctors>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
        children: [
          {
            path: "user",
            element: <UserHome></UserHome>,
          },
          {
            path: "appointments",
            element: <Appointments></Appointments>,
          },
          {
            path: "testresults",
            element: <TestResults></TestResults>,
          },
          {
            path: "addbanner",
            element: <AddBanner></AddBanner>,
          },
          {
            path: "admin",
            element: <AdminHome></AdminHome>,
          },
          {
            path: "users",
            element: <AllUsers></AllUsers>,
          },
          {
            path: "allbanner",
            element: <AllBanner></AllBanner>,
          },
          {
            path: "addtest",
            element: <AddTest></AddTest>,
          },
          {
            path: "updateitem/:_id",
            element: <UpdateItem></UpdateItem>,
          },
          {
            path: "tests",
            element: <Tests></Tests>,
          },
          {
            path: "reservations",
            element: <Reservations></Reservations>,
          },
          {
            path: "reviews",
            element: <AddReview></AddReview>,
          },
        ],
      },
    ],
  },
]);
