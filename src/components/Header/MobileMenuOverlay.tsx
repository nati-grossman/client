import { Navbar, Nav } from "react-bootstrap";

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
                className={`submenu ${openCategory === category ? "open" : ""}`}
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
