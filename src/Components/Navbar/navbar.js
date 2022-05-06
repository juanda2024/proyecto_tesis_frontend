import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'; 
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

class NavbarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginNavbarPage: true,
      showBasicNavbarPage: false
    };
  }
  toggleRender = (RTA) => {
    this.setState({ showLoginNavbarPage: RTA });
  };

  showBasicNavbar = () => {
    this.setState({ showBasicNavbarPage: true });
    this.toggleRender(false);
  };

  render() {
    const { showLoginNavbarPage, showBasicNavbarPage } = this.state;
    if (showLoginNavbarPage) {
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
    if (showBasicNavbarPage) {
      return (
        <div>
        <Navbar className="color_nav" variant="light" expand="lg">
          <Container>
              <Navbar.Brand href="/"> Avircity</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      );
    }
   else {
      return <div></div>;
    }
  }
}
export default NavbarPage;
