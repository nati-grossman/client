import { Navbar, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
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

  const handlePublishAd = () => {
    // ניווט לדף פרסום מודעה
    navigate("/publish-ad");
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
        {/* כפתור תפריט (3 פסים) בצד ימין */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleMobileMenu}
        />

        {/* לוגו במרכז */}
        <Navbar.Brand href="#" className="mx-auto">
          לוגו
        </Navbar.Brand>

        {/* כפתור פרסום בצד שמאל */}
        <div className="d-flex align-items-center">
          <Button
            variant="outline-primary"
            className="btn-success p-2"
            onClick={handlePublishAd}
          >
            + פרסום מודעה
          </Button>
        </div>

        {/* תמונת משתמש */}
        <div className="d-flex justify-content-center">
          {user.loggedIn ? (
            <div className="me-2 user-avatar">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-circle"
                width={50}
                height={50}
              />
            </div>
          ) : (
            <div className="me-2 user-avatar">
              <FontAwesomeIcon icon={faUser} className="me-2" size="lg" />
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default MobileNavbar;
