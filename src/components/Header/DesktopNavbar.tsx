import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";

interface DesktopNavbarProps {
  user: { loggedIn: boolean; avatar: string };
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ user }) => {
  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="shadow-sm d-none d-lg-flex"
    >
      <div className="container-fluid px-4">
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

        {/* לוגו בצד ימין */}
        <Navbar.Brand href="#">לוגו</Navbar.Brand>
      </div>
    </Navbar>
  );
};

export default DesktopNavbar;
