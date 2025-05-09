import { useEffect } from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./MobileMenuOverlay.css";
import { Category } from "types/Categories/Category";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom"; // ייבוא ה-hook של הניווט
import { City } from "types/Cities/City";

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  user: { loggedIn: boolean; avatar: string };
  openCategory: string | null;
  handleCategoryClick: (category: string) => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = observer(
  ({
    isMobileMenuOpen,
    toggleMobileMenu,
    user,
    openCategory,
    handleCategoryClick,
  }) => {
    const navigate = useNavigate();

    const handleStartAdPosting = () => {
      // Navigate to category selection page
      navigate("/select-category");
      // Close the mobile menu
      toggleMobileMenu();
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        (event.target as HTMLElement).classList.contains("mobile-menu-overlay")
      ) {
        toggleMobileMenu();
      }
    };

    return (
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={handleOverlayClick}
      >
        <div
          className="mobile-menu-content"
          onClick={(e) => e.stopPropagation()}
        >
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

          {/* כפתור לעלות מודעה */}
          <div className="align-items-center my-3">
            <Button
              variant="outline-primary"
              className="btn-success p-2"
              onClick={handleStartAdPosting}
            >
              + פרסום מודעה
            </Button>
          </div>

          {/* קטגוריות */}
          <Nav
            className="flex-column text-center rtl"
            style={{ marginTop: "40px", direction: "ltr" }}
          >
            {categoriesStore.categories.map((category: Category) => (
              <div key={category.categoryNumber} className="category-item">
                <div
                  className="category-content"
                  onClick={() => handleCategoryClick(category.categoryName)}
                >
                  {/* שם הקטגוריה */}
                  <div className="category-title">{category.categoryName}</div>
                  {/* אייקון */}
                  <FontAwesomeIcon icon={faHome} className="category-icon" />
                </div>
                <div
                  className={`me-3 submenu text-end ${
                    openCategory === category.categoryName ? "open" : ""
                  }`}
                >
                  {(category?.cities ?? []).map((city: City) => (
                    <NavDropdown.Item key={city.cityId} href="#">
                      {city.cityName}
                    </NavDropdown.Item>
                  ))}
                </div>
              </div>
            ))}
          </Nav>
        </div>
      </div>
    );
  }
);

export default MobileMenuOverlay;
