import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/header/Header";

function PrivateRoutes({ children }) {
  const token = sessionStorage.getItem("Access_Token");

  return [undefined, null].includes(token) ? (
    <Navigate to="/" />
  ) : (
    <>
      <Header type="employee" />
      {children}
    </>
  );
}

export default PrivateRoutes;
