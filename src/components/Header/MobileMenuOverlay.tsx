import { useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./MobileMenuOverlay.css";
import { Category } from "types/Categories/Category";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom"; // ייבוא ה-hook של הניווט

interface MobileMenuOverlayProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  user: { loggedIn: boolean; avatar: string };
  openCategory: string | null;
  handleCategoryClick: (category: string) => void;
}

// interface Category {
//   id: string;
//   name: string;
//   subcategories: Subcategory[];
// }

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = observer(
  ({
    isMobileMenuOpen,
    toggleMobileMenu,
    user,
    openCategory,
    handleCategoryClick,
  }) => {
    const navigate = useNavigate(); // יצירת פונקציה לניווט

    useEffect(() => {
      categoriesStore.fetchCategories();
    }, []);

    const handlePublishAd = () => {
      // ניווט לדף פרסום מודעה
      navigate("/publish-ad");
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

          {/* כםתור לעלות מודעה */}
          <div className="align-items-center my-3">
            <Button
              variant="outline-primary"
              className="btn-success p-2"
              onClick={handlePublishAd}
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
                  {/*
            {category.subcategories.map((subcategory) => (
                   <NavDropdown.Item key={subcategory.id} href="#">
                     {subcategory.name}
                   </NavDropdown.Item>
                 ))}


                 {category.subcategories.map((subcategory) => (
                   <NavDropdown.Item key={subcategory.id} href="#">
                     {subcategory.name}
                   </NavDropdown.Item>
                 ))}
            */}
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
