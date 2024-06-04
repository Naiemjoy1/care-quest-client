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
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
        children: [
          {
            path: "addbanner",
            element: <AddBanner></AddBanner>,
          },
          {
            path: "admin",
            element: <AdminHome></AdminHome>,
          },
        ],
      },
    ],
  },
]);
