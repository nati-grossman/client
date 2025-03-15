import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Image,
} from "react-bootstrap";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // דמוי אובייקט 'user' (אם אין לך עדיין הגדרה של המשתמש)
  const user = {
    loggedIn: true, // אם המשתמש מחובר
    avatar: "https://via.placeholder.com/30", // כתובת לתמונה
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [openCategory, setOpenCategory] = useState(null);

  const handleCategoryClick = (category: any) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <>
      {/* Navbar למצב מחשב */}
      <Navbar
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
        className="shadow-sm d-none d-lg-flex"
      >
        <div className="container-fluid px-4">
          {/* לוגו בצד ימין */}
          <Navbar.Brand href="#">לוגו</Navbar.Brand>
          {/* קטגוריות במרכז */}
          <Nav className="mx-auto">
            <NavDropdown
              title="קטגוריה 1"
              id="nav-dropdown-1"
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).click()}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).click()}
            >
              <NavDropdown.Item href="#">תת 1</NavDropdown.Item>
              <NavDropdown.Item href="#">תת 2</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="קטגוריה 2"
              id="nav-dropdown-2"
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).click()}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).click()}
            >
              <NavDropdown.Item href="#">תת 3</NavDropdown.Item>
              <NavDropdown.Item href="#">תת 4</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* תמונת משתמש וכפתור פרופיל */}
          <div className="align-items-center d-flex m-0 me-1">
            {user.loggedIn && (
              <Image
                src={user.avatar}
                roundedCircle
                width={30}
                height={30}
                className="me-2"
              />
            )}
            <Button variant="outline-primary">
              {user.loggedIn ? "פרופיל" : "התחברות"}
            </Button>
          </div>
        </div>
      </Navbar>
      {/* Navbar למובייל */}
      <Navbar
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
        className="d-flex d-lg-none"
      >
        <Container>
          {/* כפתור תפריט (3 פסים) בצד ימין */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleMobileMenu}
          />
          {/* לוגו במרכז */}
          <Navbar.Brand href="#" className="mx-auto">
            לוגו
          </Navbar.Brand>
          {/* כפתור פרופיל בצד שמאל */}
          <div className="d-flex align-items-center">
            <Button variant="outline-primary">
              {user.loggedIn ? "פרופיל" : "התחברות"}
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* פופ-אפ למובייל אם התפריט פתוח */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {/* אייקון סגירה (X) */}
          <span className="close-icon" onClick={toggleMobileMenu}>
            ✖
          </span>
          {/* תמונת משתמש */}
          <div className="d-flex justify-content-center">
            {user.loggedIn && (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-circle"
                width={50}
                height={50}
              />
            )}
          </div>
          {/* לוגו */}
          <div className="d-flex justify-content-center my-3">
            <Navbar.Brand href="#">לוגו</Navbar.Brand>
          </div>
          {/* קטגוריות */}
          <Nav className="flex-column text-center">
            {["קטגוריה 1", "קטגוריה 2"].map((category, index) => (
              <div key={index}>
                <div
                  className="category-title"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </div>
                <div
                  className={`submenu ${
                    openCategory === category ? "open" : ""
                  }`}
                >
                  <Nav.Link href="#">תת {index * 2 + 1}</Nav.Link>
                  <Nav.Link href="#">תת {index * 2 + 2}</Nav.Link>
                </div>
              </div>
            ))}
          </Nav>
        </div>
      </div>
    </>
  );
}
