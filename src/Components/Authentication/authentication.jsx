import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthorized")) || false
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(JSON.parse(localStorage.getItem("isAuthorized")) || false);
    };

    window.addEventListener("storage", handleStorageChange); 

    return () => {
      window.removeEventListener("storage", handleStorageChange); 
    };
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/singin" replace />;
};

export default PrivateRoute;
