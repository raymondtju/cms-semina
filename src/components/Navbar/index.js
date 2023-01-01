import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavLink from "../NavLink";

function SNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink action={() => navigate("/")}>Home</NavLink>
          <NavLink action={() => navigate("/categories")}>Categories</NavLink>
          <NavLink action={() => navigate("/speakers")}>Speakers</NavLink>
          <NavLink action={() => navigate("/events")}>Events</NavLink>
          <NavLink action={() => navigate("/participant")}>Participant</NavLink>
          <NavLink action={() => navigate("/Transactions")}>
            Transactions
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SNavbar;
