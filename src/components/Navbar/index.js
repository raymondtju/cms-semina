import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavLink from "../NavAccess";

import {
  accessCategories,
  accessTalents,
  accessEvents,
  accessPayments,
  accessParticipant,
  accessOrders,
} from "../../const/access";

function SNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetch = () => {
      let { role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
      setRole(role);
    };
    fetch();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink
            role={role}
            roles={accessCategories.view}
            action={() => navigate("/")}
          >
            Home
          </NavLink>
          <NavLink
            role={role}
            roles={accessCategories.view}
            action={() => navigate("/categories")}
          >
            Categories
          </NavLink>
          <NavLink
            role={role}
            roles={accessTalents.view}
            action={() => navigate("/talents")}
          >
            Talents
          </NavLink>
          <NavLink
            role={role}
            roles={accessPayments.view}
            action={() => navigate("/payments")}
          >
            Payment
          </NavLink>
          {/* <NavLink
            role={role}
            roles={organizers.view}
            action={() => navigate('/organizers')}
          >
            Oranizer
          </NavLink> */}
          <NavLink
            role={role}
            roles={accessEvents.view}
            action={() => navigate("/events")}
          >
            Events
          </NavLink>
          <NavLink
            role={role}
            roles={accessParticipant.view}
            action={() => navigate("/participant")}
          >
            Participant
          </NavLink>
          <NavLink
            role={role}
            roles={accessOrders.view}
            action={() => navigate("/orders")}
          >
            Orders
          </NavLink>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SNavbar;
