import { createBrowserRouter } from "react-router-dom";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Home from "../pages/Home";
import ProtectedRoutes from "./ProtectedRouts";
import Layout from "./Layout";
import Books from "../pages/Books";
import MyBorrowed from "../pages/MyBorrowed";
import ManageBooks from "../pages/ManageBooks";
import Users from "../pages/Users";

// Dummy pages (abhi bana sakte ho)
// import MyBorrowed from "../pages/MyBorrowed";
// import ManageBooks from "../pages/admin/ManageBooks";
// import Users from "../pages/admin/Users";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />, // verify user before showing
    children: [
      {
        path: "/",
        element: <Layout />, // Navbar + Outlet wrapper
        children: [
          { path: "/", element: <Home /> },

          // ✅ User pages
          { path: "/books", element: <Books /> },
          { path: "/my-borrowed", element: <MyBorrowed /> },

          // ✅ Admin pages
          { path: "/admin/manage-books", element: <ManageBooks /> },
          { path: "/admin/users", element: <Users /> },
        ],
      },
    ],
  },

  // Public routes
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

export default router;
