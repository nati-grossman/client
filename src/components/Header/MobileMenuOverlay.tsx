import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./MobileMenuOverlay.css";

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  user: { loggedIn: boolean; avatar: string };
  openCategory: string | null;
  handleCategoryClick: (category: string) => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  user,
  openCategory,
  handleCategoryClick,
}) => {
  return (
    <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
      <div className="mobile-menu-content">
        {/* אייקון סגירה (X) */}
        <span className="close-icon" onClick={toggleMobileMenu}>
          ✖
        </span>

        {/* רווח בין האייקון לתוכן */}
        <div className="content-spacing" />

        {/* לוגו */}
        <div className="d-flex justify-content-center my-3">
          <Navbar.Brand href="#">לוגו</Navbar.Brand>
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

        {/* קטגוריות */}
        <Nav className="flex-column text-center" style={{ marginTop: "40px" }}>
          {["קטגוריה 1", "קטגוריה 2"].map((category, index) => (
            <div key={index} className="category-item">
              <div
                className="category-content"
                onClick={() => handleCategoryClick(category)}
              >
                {/* שם הקטגוריה */}
                <div className="category-title">{category}</div>
                {/* אייקון */}
                <FontAwesomeIcon icon={faHome} className="category-icon" />
              </div>
              <div
                className={`me-3 submenu text-end ${
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
  );
};

export default MobileMenuOverlay;
