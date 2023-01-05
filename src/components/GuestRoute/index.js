// import * as React from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute({ children }) {
  let { token } = useSelector((state) => state.auth);

  if (token) return <Navigate to="/" replace={true} />;

  return children || <Outlet />;
}
