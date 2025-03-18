import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ייבוא ה-hook של הניווט

interface MobileNavbarProps {
  toggleMobileMenu: () => void;
  user: { loggedIn: boolean; avatar: string };
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  toggleMobileMenu,
  user,
}) => {
  const navigate = useNavigate(); // יצירת פונקציה לניווט

  const handleProfileClick = () => {
    navigate("/personal-area"); // ניווט לדף האזור האישי
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="d-flex d-lg-none header-navbar"
    >
      <Container>
        {/* כפתור פרופיל בצד שמאל */}
        <div className="d-flex align-items-center">
          <Button
            variant="outline-primary"
            className="btn-success p-2"
            onClick={handleProfileClick} // קריאה לפונקציה בעת לחיצה
          >
            האזור האישי
          </Button>
        </div>

        {/* לוגו במרכז */}
        <Navbar.Brand href="#" className="mx-auto">
          לוגו
        </Navbar.Brand>

        {/* כפתור תפריט (3 פסים) בצד ימין */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleMobileMenu}
        />
      </Container>
    </Navbar>
  );
};

export default MobileNavbar;
