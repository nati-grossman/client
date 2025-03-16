import { useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./DesktopNavbar.css"; // קובץ העיצוב המעודכן

interface DesktopNavbarProps {
  user: { loggedIn: boolean; avatar: string };
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ user }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleClick = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="shadow-sm d-none d-lg-flex header-navbar"
    >
      <div className="container-fluid px-4">
        {/* תמונת משתמש וכפתור פרופיל */}
        <div className="align-items-center d-flex m-0 me-1">
          {user.loggedIn ? (
            <div className="me-2 user-avatar">
              <Image
                src={user.avatar}
                roundedCircle
                width={30}
                height={30}
                className="me-2"
              />
            </div>
          ) : (
            <div className="me-2 user-avatar">
              <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
            </div>
          )}
          <Button variant="success">פרסום מודעה</Button>
        </div>

        {/* קטגוריות במרכז */}
        <Nav className="mx-auto category-nav">
          <div
            onMouseEnter={() => handleMouseEnter("nav-dropdown-1")}
            onMouseLeave={handleMouseLeave}
          >
            <NavDropdown
              title="קטגוריה 1"
              id="nav-dropdown-1"
              className="custom-dropdown"
              show={openDropdown === "nav-dropdown-1"}
              onClick={() => handleClick("nav-dropdown-1")}
            >
              <NavDropdown.Item href="#">תת 1</NavDropdown.Item>
              <NavDropdown.Item href="#">תת 2</NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className="separator"></div> {/* מפריד בין הקטגוריות */}
          <div
            onMouseEnter={() => handleMouseEnter("nav-dropdown-2")}
            onMouseLeave={handleMouseLeave}
          >
            <NavDropdown
              title="קטגוריה 2"
              id="nav-dropdown-2"
              className="custom-dropdown"
              show={openDropdown === "nav-dropdown-2"}
              onClick={() => handleClick("nav-dropdown-2")}
            >
              <NavDropdown.Item href="#">תת 3</NavDropdown.Item>
              <NavDropdown.Item href="#">תת 4</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>

        {/* לוגו בצד ימין */}
        <Navbar.Brand href="#">לוגו</Navbar.Brand>
      </div>
    </Navbar>
  );
};

export default DesktopNavbar;
