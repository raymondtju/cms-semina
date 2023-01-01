import React from "react";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import SBreadcrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";

export default function Dashboard() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/signin" replace={true} />;
  }
  return (
    <>
      <SNavbar />

      <Container>
        <SBreadcrumb />
      </Container>
    </>
  );
}
