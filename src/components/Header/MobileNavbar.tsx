import { Navbar, Container, Button } from "react-bootstrap";

interface MobileNavbarProps {
  toggleMobileMenu: () => void;
  user: { loggedIn: boolean; avatar: string };
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  toggleMobileMenu,
  user,
}) => {
  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="d-flex d-lg-none header-navbar"
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
          <Button variant="outline-primary" className="btn-success">
            האזור האישי
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default MobileNavbar;
