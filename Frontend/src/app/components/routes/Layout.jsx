import React from "react";
import Navbar from "../common/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../service/UserContext";
import url from "../../service/url";

function Layout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch(`${url}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        navigate("/login", { replace: true }); // redirect after logout
      } else {
        console.error("Logout failed:", await res.text());
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {/* Navbar with user info */}
      <Navbar user={user} logout={logout} />
      {/* Render the rest of the app */}
      <Outlet />
    </>
  );
}

export default Layout;
