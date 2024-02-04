import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { authState } = useSelector((state) => state.Auth);
  return authState ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
