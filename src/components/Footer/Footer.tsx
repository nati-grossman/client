import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="text-white text-center p-4 mt-4" style={{backgroundColor: 'rgb(96, 197, 140)'}}>
      <Container>
        <Row>
          {/* קישורים לדפים במערכת */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-white">התחבר</Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-white">הירשם</Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-white">אודות</Nav.Link>
            </Nav>
          </Col>

          {/* פרטי יצירת קשר */}
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>info@myapp.com</p>
            <p>+1 (555) 123-4567</p>
          </Col>

          {/* מדיה חברתית */}
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <Nav className="justify-content-center">
              <Nav.Link href="#" className="text-white">Facebook</Nav.Link>
              <Nav.Link href="#" className="text-white">Twitter</Nav.Link>
              <Nav.Link href="#" className="text-white">Instagram</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p>© 2025 My App. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
