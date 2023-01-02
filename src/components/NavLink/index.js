import React from "react";
import { Nav } from "react-bootstrap";

function NavLink({ action, children, active }) {
  return (
    <Nav.Link onClick={action} active={active}>
      {children}
    </Nav.Link>
  );
}

export default NavLink;
