import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Popover,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import styles from "./Navigation.module.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faUser } from '@fortawesome/free-solid-svg-icons';

interface DropdownItem {
  label: string;
  link: string;
}

interface Dropdown {
  title: string;
  id: string;
  items: DropdownItem[];
}

const Navigation: React.FC = () => {
  const [dropdowns, setDropdowns] = useState<Dropdown[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/Data/dropdown.json")
      .then((res) => res.json())
      .then((data: Dropdown[]) => setDropdowns(data))
      .catch((err) => console.error("Failed to fetch dropdowns", err));
  }, []);

  const handleMouseEnter = (id: string) => setDropdownOpen(id);
  const handleMouseLeave = () => setDropdownOpen(null);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">פרטי משתמש</Popover.Header>
      <Popover.Body>כאן יהיו פרטי משתמש כמו היסטוריה ו???</Popover.Body>
    </Popover>
  );

  return (
    <>
      <Navbar
        dir="rtl"
        variant="dark"
        expand="lg"
        style={{ backgroundColor: "#B0BEC5" }}
      >
        <Navbar.Brand as={Link} to="/" className="mx-3">
          מיד ליד
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto mx-auto">
            {/* קישורים לדפים כמו התחברות והרשמה 
            <Nav.Link as={Link} to="/login">התחבר</Nav.Link>
            <Nav.Link as={Link} to="/register">הירשם</Nav.Link>*/}

            {dropdowns.map((dropdown) => (
              <NavDropdown
                key={dropdown.id}
                title={dropdown.title}
                id={dropdown.id}
                show={dropdownOpen === dropdown.id}
                onMouseEnter={() => handleMouseEnter(dropdown.id)}
                onMouseLeave={handleMouseLeave}
                className={styles.dropdownToggle}
              >
                {dropdown.items.map((item, index) => (
                  <NavDropdown.Item key={index} as={Link} to={item.link}>
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}
          </Nav>

          {/* תמונה עם פופאפ קטן */}
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button variant="link">
              <img
                src="/images/userNavbar.png"
                alt="User Profile"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </Button>
          </OverlayTrigger>
          {/*
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
              <Button variant="link">
                <FontAwesomeIcon icon={faUser} style={{ fontSize: "30px", color: "#000" }} />
              </Button>
            </OverlayTrigger>
          */}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
