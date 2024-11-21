"use client";
import { useState } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Logo } from "./logo";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar
      expand="sm"
      fixed="top"
      style={{ backgroundColor: "rgb(180,220,240)" }}
    >
      <NavbarBrand className="me-5" href="/">
        <Logo></Logo>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/locations">Lokalizacje</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/alerts">Alarmy</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
