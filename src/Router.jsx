import { createBrowserRouter } from "react-router";
import AuthLayout from "./Layout/AuthLayout";
import HomeLayout from "./Layout/HomeLayout";
import LogIn from "./page/LogIn";
import SignUp from "./page/SignUp";
import MyProfile from "./page/MyProfile";
import ForgetPassword from "./page/ForgetPassword";
import DashboardLayout from "./Layout/DashbordLayout";
import UserDashboard from "./components/UserDashboard";
import LibrarianDashboard from "./components/LibrarianDashboard";
import AdminDashboard from "./AdminDashboard";
import EditBook from "./components/EditBook";

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
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "/dashboard/librarian",
        element: <LibrarianDashboard></LibrarianDashboard>,
      },
      {
        path: "/dashboard/admin",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "/dashboard/librarian/edit-book/:id",
        element: <EditBook></EditBook>,
      },
    ],
  },
  {
    path: "/profile",
    element: <MyProfile></MyProfile>
  }
]);

export default router;