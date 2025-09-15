import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../common/Loading";
import { useUser } from "../../service/UserContext";
import url from "../../service/url";


function ProtectedRoutes() {
  const { setUser } = useUser(); 
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${url}/api/verify`, { // backend verify route
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          if (data.success) setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading />; 
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
