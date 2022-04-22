import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'; 
import "./navbar.css";

const navbar = () =>{
  return (
  <div>
    <Navbar className="color_nav" variant="light" expand="lg">
      <Container>
          <Navbar.Brand href="/"> Avircity</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/register">Registrarse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  );
}
export default navbar;