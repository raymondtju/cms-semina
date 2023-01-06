import React from "react";
import { Container } from "react-bootstrap";
import SBreadcrumb from "../../components/Breadcrumb";

export default function Dashboard() {
  return (
    <Container>
      <SBreadcrumb />
      <h1>Dashboard</h1>
    </Container>
  );
}
