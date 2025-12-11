import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Layout/AuthLayout";
import HomeLayout from "./Layout/HomeLayout";

import LogIn from "./page/LogIn";
import SignUp from "./page/SignUp";
import MyProfile from "./page/MyProfile";
import ForgetPassword from "./page/ForgetPassword";

import UserDashboard from "./components/UserDashboard";
import EditBook from "./components/EditBook";
import PrivateRoute from "./auth/PrivateRoute";
import RoleRoute from "./auth/RoleRoute";
import AdminDashboard from "./AdminDashboard";
import DashboardLayout from "./Layout/DashbordLayout";
import LibrarianDashboard from "./components/LibrarianDashboard";
import AllBooks from "./components/LatestBooks";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  { path: "/", element: <HomeLayout /> },
  { path: "/books", element: <AllBooks /> },

  // AUTH ROUTES

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <LogIn /> },
      { path: "register", element: <SignUp /> },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },

  // PROFILE
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <MyProfile />
      </PrivateRoute>
    ),
  },

  // DASHBOARD ROUTES
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // DEFAULT USER DASHBOARD
      { path: "User", element: <UserDashboard /> },

      // LIBRARIAN DASHBOARD
      {
        path: "librarian",
        element: (
          <RoleRoute allow={["librarian", "admin"]}>
            <LibrarianDashboard />
          </RoleRoute>
        ),
      },

      // ADMIN DASHBOARD
      {
        path: "admin",
        element: (
          <RoleRoute allow={["admin"]}>
            <AdminDashboard />
          </RoleRoute>
        ),
      },

      // EDIT BOOK – only librarian/admin
      {
        path: "librarian/edit-book/:id",
        element: (
          <RoleRoute allow={["librarian", "admin"]}>
            <EditBook />
          </RoleRoute>
        ),
      },
    ],
  },
]);

export default router;
