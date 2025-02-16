import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Navigation: React.FC = () => {
  return (
    <Navbar variant="dark" expand="lg" style={{backgroundColor: 'rgb(96, 197, 140)'}}>
      <Navbar.Brand as={Link} to="/" className='mx-3'>My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <NavDropdown title="More" id="navbar-dropdown">
            <NavDropdown.Item as={Link} to="/homePage">Home Page</NavDropdown.Item>
            {/* הוספת תתי קטגוריות נוספות */}
            <NavDropdown.Item href="#">Another Page</NavDropdown.Item>
            <NavDropdown.Item href="#">Some More</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
