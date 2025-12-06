import { createBrowserRouter } from "react-router";
import AuthLayout from "./Layout/AuthLayout";
import HomeLayout from "./Layout/HomeLayout";
import LogIn from "./page/LogIn";
import SignUp from "./page/SignUp";
import MyProfile from "./page/MyProfile";
import ForgetPassword from "./page/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth",
        element: <LogIn></LogIn>,
      },
      {
        path: "/auth/register",
        element: <SignUp></SignUp>,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword></ForgetPassword>,
      }
    ],
  },
  {
    path: "/profile",
    element: <MyProfile></MyProfile>
  }
]);

export default router;